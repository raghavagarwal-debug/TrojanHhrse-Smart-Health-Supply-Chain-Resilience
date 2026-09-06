import pandas as pd
import xgboost as xgb
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score, classification_report, accuracy_score
import joblib
import os
from preprocess import preprocess_pipeline

def train_demand_forecast(df, feature_cols):
    print("\n--- Training Demand Forecast Model ---")
    # Target: next_7_day_demand
    
    # Chronological Split (Train on first 80% days, test on last 20%)
    split_idx = int(len(df) * 0.8)
    train_df = df.iloc[:split_idx]
    test_df = df.iloc[split_idx:]
    
    X_train, y_train = train_df[feature_cols], train_df['next_7_day_demand']
    X_test, y_test = test_df[feature_cols], test_df['next_7_day_demand']
    
    model = xgb.XGBRegressor(n_estimators=100, learning_rate=0.1, max_depth=5, random_state=42)
    model.fit(X_train, y_train)
    
    preds = model.predict(X_test)
    
    print(f"MAE: {mean_absolute_error(y_test, preds):.2f}")
    print(f"RMSE: {mean_squared_error(y_test, preds, squared=False):.2f}")
    print(f"R2: {r2_score(y_test, preds):.2f}")
    
    os.makedirs('models', exist_ok=True)
    joblib.dump(model, 'models/demand_forecast_xgboost.joblib')
    print("Saved demand_forecast_xgboost.joblib")

def train_stockout_risk(df, feature_cols):
    print("\n--- Training Stock-Out Risk Model ---")
    # Target: stock_out (binary)
    
    split_idx = int(len(df) * 0.8)
    train_df = df.iloc[:split_idx]
    test_df = df.iloc[split_idx:]
    
    X_train, y_train = train_df[feature_cols], train_df['stock_out']
    X_test, y_test = test_df[feature_cols], test_df['stock_out']
    
    model = xgb.XGBClassifier(n_estimators=100, learning_rate=0.1, max_depth=5, random_state=42, eval_metric='logloss')
    model.fit(X_train, y_train)
    
    preds = model.predict(X_test)
    
    print(classification_report(y_test, preds))
    
    joblib.dump(model, 'models/stockout_risk_xgboost.joblib')
    print("Saved stockout_risk_xgboost.joblib")

def train_health_risk(df, feature_cols):
    print("\n--- Training PHC Health Risk Model ---")
    # Target: health_risk (multiclass 0, 1, 2, 3)
    
    split_idx = int(len(df) * 0.8)
    train_df = df.iloc[:split_idx]
    test_df = df.iloc[split_idx:]
    
    X_train, y_train = train_df[feature_cols], train_df['health_risk']
    X_test, y_test = test_df[feature_cols], test_df['health_risk']
    
    model = xgb.XGBClassifier(n_estimators=100, learning_rate=0.1, max_depth=5, random_state=42, objective='multi:softprob')
    model.fit(X_train, y_train)
    
    preds = model.predict(X_test)
    
    print(f"Accuracy: {accuracy_score(y_test, preds):.2f}")
    print(classification_report(y_test, preds))
    
    joblib.dump(model, 'models/phc_health_risk_xgboost.joblib')
    print("Saved phc_health_risk_xgboost.joblib")

if __name__ == "__main__":
    if not os.path.exists('data/synthetic_arogyapulse_data.csv'):
        from data_generator import generate_dataset
        generate_dataset()
        
    df = preprocess_pipeline('data/synthetic_arogyapulse_data.csv')
    
    # Define features to use
    feature_cols = [
        'phc_id', 'state', 'district', 'city', 'medicine', 'medicine_category',
        'patient_count', 'opd_count', 'ipd_count', 'disease_cases', 'mortality',
        'opening_stock', 'received_quantity', 'dispensed_quantity', 'closing_stock',
        'current_stock', 'daily_consumption', 'previous_7_day_demand', 'previous_30_day_demand',
        'supply_lead_time', 'incoming_supply', 'bed_occupancy', 'medicine_availability',
        'temperature', 'rainfall', 'humidity', 'vaccination_coverage',
        'consumption_trend', 'patient_growth', 'disease_growth', 'stock_coverage_days',
        'phc_utilization_score', 'disease_pressure_score', 'month', 'day_of_week'
    ]
    
    # Save the feature columns so the API knows what to expect
    joblib.dump(feature_cols, 'models/feature_cols.joblib')
    
    train_demand_forecast(df, feature_cols)
    train_stockout_risk(df, feature_cols)
    train_health_risk(df, feature_cols)
    print("\nAll models trained successfully!")
