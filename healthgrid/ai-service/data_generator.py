import pandas as pd
import numpy as np
from datetime import datetime, timedelta
import random
import os

# Set seed for reproducibility
np.random.seed(42)
random.seed(42)

# Configuration
NUM_PHCS = 10
DAYS = 365
START_DATE = datetime(2023, 1, 1)

# Sample Data
STATES = ["Maharashtra", "Karnataka", "Delhi"]
DISTRICTS = {
    "Maharashtra": ["Mumbai", "Pune", "Nagpur"],
    "Karnataka": ["Bengaluru", "Mysuru", "Hubli"],
    "Delhi": ["New Delhi", "North Delhi", "South Delhi"]
}

MEDICINES = [
    {"name": "Paracetamol 500mg", "category": "Analgesic", "avg_daily_demand": 100},
    {"name": "Amoxicillin 250mg", "category": "Antibiotic", "avg_daily_demand": 50},
    {"name": "ORS Powder", "category": "Rehydration", "avg_daily_demand": 200},
    {"name": "IV Fluids (NS)", "category": "IV Fluid", "avg_daily_demand": 30},
    {"name": "O2 Cylinder", "category": "Oxygen", "avg_daily_demand": 5}
]

def generate_phcs():
    phcs = []
    for i in range(NUM_PHCS):
        state = random.choice(STATES)
        district = random.choice(DISTRICTS[state])
        phcs.append({
            "phc_id": f"PHC-{i:03d}",
            "state": state,
            "district": district,
            "city": district,
            "latitude": random.uniform(10.0, 30.0),
            "longitude": random.uniform(70.0, 90.0),
            "base_population": random.randint(10000, 50000)
        })
    return phcs

def generate_dataset():
    phcs = generate_phcs()
    records = []
    
    dates = [START_DATE + timedelta(days=i) for i in range(DAYS)]
    
    for phc in phcs:
        for med in MEDICINES:
            current_stock = random.randint(50, 500)
            
            for date in dates:
                # Seasonal effects (more cases in monsoon: July-Sept)
                month = date.month
                is_monsoon = 1 if 7 <= month <= 9 else 0
                
                # Weather
                temperature = random.uniform(15.0, 45.0)
                rainfall = random.uniform(0.0, 50.0) if is_monsoon else random.uniform(0.0, 5.0)
                humidity = random.uniform(30.0, 90.0) if is_monsoon else random.uniform(20.0, 60.0)
                
                # Patient Metrics
                base_pat = int(phc["base_population"] * random.uniform(0.001, 0.005))
                patient_count = int(base_pat * (1 + 0.3 * is_monsoon) * random.uniform(0.8, 1.2))
                opd_count = int(patient_count * 0.9)
                ipd_count = patient_count - opd_count
                
                disease_cases = int(patient_count * random.uniform(0.1, 0.4))
                mortality = int(disease_cases * random.uniform(0.0, 0.02))
                
                bed_occupancy = min(1.0, (ipd_count / 20.0) * random.uniform(0.8, 1.2)) # Assuming 20 beds avg
                vaccination_coverage = random.uniform(0.6, 0.95)
                
                # Inventory Metrics
                daily_consumption = int(med["avg_daily_demand"] * (patient_count / base_pat) * random.uniform(0.7, 1.3))
                
                # Supply logic
                received_quantity = 0
                if current_stock < med["avg_daily_demand"] * 3: # reorder if < 3 days stock
                    received_quantity = med["avg_daily_demand"] * 14 # order 14 days stock
                    
                opening_stock = current_stock
                current_stock = opening_stock + received_quantity
                dispensed_quantity = min(current_stock, daily_consumption)
                closing_stock = current_stock - dispensed_quantity
                current_stock = closing_stock
                
                medicine_availability = 1.0 if closing_stock > 0 else 0.0
                
                # Create record
                record = {
                    "date": date.strftime("%Y-%m-%d"),
                    "phc_id": phc["phc_id"],
                    "state": phc["state"],
                    "district": phc["district"],
                    "city": phc["city"],
                    "latitude": phc["latitude"],
                    "longitude": phc["longitude"],
                    "medicine": med["name"],
                    "medicine_category": med["category"],
                    "patient_count": patient_count,
                    "opd_count": opd_count,
                    "ipd_count": ipd_count,
                    "disease_cases": disease_cases,
                    "mortality": mortality,
                    "opening_stock": opening_stock,
                    "received_quantity": received_quantity,
                    "dispensed_quantity": dispensed_quantity,
                    "closing_stock": closing_stock,
                    "current_stock": current_stock,
                    "daily_consumption": dispensed_quantity,
                    "supply_lead_time": random.randint(1, 5),
                    "incoming_supply": received_quantity if received_quantity > 0 else 0,
                    "bed_occupancy": bed_occupancy,
                    "medicine_availability": medicine_availability,
                    "temperature": temperature,
                    "rainfall": rainfall,
                    "humidity": humidity,
                    "vaccination_coverage": vaccination_coverage
                }
                records.append(record)
                
    df = pd.DataFrame(records)
    
    # Calculate rolling features (grouped by phc and medicine)
    df['date'] = pd.to_datetime(df['date'])
    df = df.sort_values(by=['phc_id', 'medicine', 'date'])
    
    df['previous_7_day_demand'] = df.groupby(['phc_id', 'medicine'])['daily_consumption'].rolling(window=7, min_periods=1).sum().values
    df['previous_7_day_demand'] = df.groupby(['phc_id', 'medicine'])['previous_7_day_demand'].shift(1).fillna(0)
    
    df['previous_30_day_demand'] = df.groupby(['phc_id', 'medicine'])['daily_consumption'].rolling(window=30, min_periods=1).sum().values
    df['previous_30_day_demand'] = df.groupby(['phc_id', 'medicine'])['previous_30_day_demand'].shift(1).fillna(0)
    
    # Target: next 7 day demand
    # We shift negative to look into the future
    df['next_7_day_demand'] = df.groupby(['phc_id', 'medicine'])['daily_consumption'].rolling(window=7, min_periods=1).sum().values
    df['next_7_day_demand'] = df.groupby(['phc_id', 'medicine'])['next_7_day_demand'].shift(-7)
    
    # Target: stock_out (will current_stock be 0 in the next 7 days?)
    df['future_stock_min'] = df.groupby(['phc_id', 'medicine'])['closing_stock'].rolling(window=7, min_periods=1).min().values
    df['future_stock_min'] = df.groupby(['phc_id', 'medicine'])['future_stock_min'].shift(-7)
    df['stock_out'] = (df['future_stock_min'] <= 0).astype(int)
    
    # Drop rows where we don't have future targets (last 7 days of the dataset)
    df = df.dropna(subset=['next_7_day_demand', 'stock_out'])
    
    # Create directory if it doesn't exist
    os.makedirs('data', exist_ok=True)
    df.to_csv('data/synthetic_arogyapulse_data.csv', index=False)
    print(f"Generated synthetic dataset with {len(df)} rows.")

if __name__ == "__main__":
    generate_dataset()
