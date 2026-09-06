from flask import Flask, request, jsonify
import pandas as pd
import joblib
import numpy as np
import os
from preprocess import feature_engineering

app = Flask(__name__)

# Load models and encoders
models = {}
encoders = {}
feature_cols = []

def load_models():
    global models, encoders, feature_cols
    print("Loading ML models...")
    try:
        models['demand_forecast'] = joblib.load('models/demand_forecast_xgboost.joblib')
        models['stockout_risk'] = joblib.load('models/stockout_risk_xgboost.joblib')
        models['health_risk'] = joblib.load('models/phc_health_risk_xgboost.joblib')
        encoders = joblib.load('models/label_encoders.joblib')
        feature_cols = joblib.load('models/feature_cols.joblib')
        print("Models loaded successfully.")
    except Exception as e:
        print(f"Warning: Models not loaded. Please train them first. Error: {e}")

load_models()

def prepare_features(data: dict):
    df = pd.DataFrame([data])
    df = feature_engineering(df)
    
    # Encode categorical
    for col in encoders:
        if col in df.columns:
            # Handle unseen labels gracefully for inference
            try:
                df[col] = encoders[col].transform(df[col].astype(str))
            except ValueError:
                df[col] = -1 # Unknown category
                
    # Ensure all columns exist
    for col in feature_cols:
        if col not in df.columns:
            df[col] = 0
            
    return df[feature_cols]

def generate_explanation(df, risk_level_str):
    factors = []
    if df['disease_growth'].iloc[0] > 0.1:
        factors.append(f"Disease cases increased by {df['disease_growth'].iloc[0]*100:.1f}%")
    if df['stock_coverage_days'].iloc[0] < 5:
        factors.append(f"Medicine stock is critically low (< {df['stock_coverage_days'].iloc[0]:.1f} days)")
    if df['patient_growth'].iloc[0] > 0.1:
        factors.append(f"Patient demand increased by {df['patient_growth'].iloc[0]*100:.1f}%")
    if df['bed_occupancy'].iloc[0] > 0.8:
        factors.append(f"Bed occupancy is very high ({df['bed_occupancy'].iloc[0]*100:.1f}%)")
        
    if not factors:
        factors.append("Conditions are stable.")
        
    return factors

@app.route("/health", methods=["GET"])
def health_check():
    return jsonify({"status": "ok", "models_loaded": len(models) == 3})

@app.route("/predict/demand", methods=["POST"])
def predict_demand():
    if 'demand_forecast' not in models:
        return jsonify({"error": "Models not loaded"}), 503
    
    data = request.json
    features = prepare_features(data)
    pred = models['demand_forecast'].predict(features)[0]
    return jsonify({"predicted_demand": int(max(0, pred))})

@app.route("/predict/stockout-risk", methods=["POST"])
def predict_stockout_risk():
    if 'stockout_risk' not in models:
        return jsonify({"error": "Models not loaded"}), 503
    
    data = request.json
    features = prepare_features(data)
    prob = float(models['stockout_risk'].predict_proba(features)[0][1])
    
    risk_level = "LOW"
    if prob > 0.75:
        risk_level = "HIGH"
    elif prob > 0.4:
        risk_level = "MEDIUM"
        
    return jsonify({
        "stockout_probability": prob,
        "risk": risk_level,
        "factors": generate_explanation(features, risk_level)
    })

@app.route("/predict/health-risk", methods=["POST"])
def predict_health_risk():
    if 'health_risk' not in models:
        return jsonify({"error": "Models not loaded"}), 503
    
    data = request.json
    features = prepare_features(data)
    probs = models['health_risk'].predict_proba(features)[0]
    pred_class = int(np.argmax(probs))
    
    risk_map = {0: "NORMAL", 1: "WATCH", 2: "HIGH", 3: "CRITICAL"}
    risk_level = risk_map.get(pred_class, "UNKNOWN")
    
    return jsonify({
        "health_risk_level": risk_level,
        "risk_class": pred_class,
        "probability": float(np.max(probs)),
        "factors": generate_explanation(features, risk_level)
    })

@app.route("/predict", methods=["POST"])
def predict_all():
    data = request.json
    features = prepare_features(data)
    
    # 1. Demand Forecast
    if 'demand_forecast' not in models:
        return jsonify({"error": "Demand model not loaded"}), 503
    demand_pred = float(models['demand_forecast'].predict(features)[0])
    predicted_7_day_demand = max(0.0, demand_pred)
    
    # 2. Stockout Risk
    stockout_prob = 0.0
    if 'stockout_risk' in models:
        stockout_prob = float(models['stockout_risk'].predict_proba(features)[0][1])
        
    # 3. Health Risk
    health_risk_level = "UNKNOWN"
    if 'health_risk' in models:
        health_probs = models['health_risk'].predict_proba(features)[0]
        health_pred_class = int(np.argmax(health_probs))
        risk_map = {0: "LOW", 1: "MEDIUM", 2: "HIGH", 3: "CRITICAL"}
        health_risk_level = risk_map.get(health_pred_class, "UNKNOWN")
        
    # Calculations
    current_stock = float(data.get('current_stock', 0))
    daily_avg_demand = predicted_7_day_demand / 7.0 if predicted_7_day_demand > 0 else 0.01
    
    estimated_days_of_stock = current_stock / daily_avg_demand
    predicted_shortage_units = max(0.0, predicted_7_day_demand - current_stock)
    
    return jsonify({
        "predicted_7_day_demand": round(predicted_7_day_demand, 2),
        "stockout_probability": round(stockout_prob, 4),
        "risk_level": health_risk_level,
        "estimated_days_of_stock": round(estimated_days_of_stock, 1),
        "predicted_shortage_units": round(predicted_shortage_units, 0)
    })

@app.route("/metrics", methods=["GET"])
def metrics():
    return jsonify({"status": "healthy", "uptime": "ok"})

@app.route("/explain", methods=["POST"])
def explain():
    data = request.json
    features = prepare_features(data)
    factors = generate_explanation(features, "UNKNOWN")
    return jsonify({"factors": factors})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000)
