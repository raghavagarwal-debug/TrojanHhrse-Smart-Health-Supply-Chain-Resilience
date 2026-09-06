export const predictDemand = async (data: any) => {
  try {
    const mlUrl = process.env.ML_SERVICE_URL || 'http://127.0.0.1:8000';
    const response = await fetch(`${mlUrl}/predict/demand`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      throw new Error(`ML Service responded with status ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error connecting to ML service for demand forecast:', error);
    // Fallback to mock data if ML service is down
    return { predicted_demand: data.current_stock || 100 };
  }
};

export const predictStockoutRisk = async (data: any) => {
  try {
    const mlUrl = process.env.ML_SERVICE_URL || 'http://127.0.0.1:8000';
    const response = await fetch(`${mlUrl}/predict/stockout-risk`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      throw new Error(`ML Service responded with status ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error connecting to ML service for stockout risk:', error);
    return { stockout_probability: 0.1, risk: "LOW", factors: ["ML service offline, returning default"] };
  }
};

export const predictHealthRisk = async (data: any) => {
  try {
    const mlUrl = process.env.ML_SERVICE_URL || 'http://127.0.0.1:8000';
    const response = await fetch(`${mlUrl}/predict/health-risk`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      throw new Error(`ML Service responded with status ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error connecting to ML service for health risk:', error);
    return { health_risk_level: "UNKNOWN", probability: 0, factors: ["ML service offline"] };
  }
};

export const runFullSimulationPrediction = async (data: any) => {
  try {
    const mlUrl = process.env.ML_SERVICE_URL || 'http://127.0.0.1:8000';
    const response = await fetch(`${mlUrl}/predict`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      throw new Error(`ML Service responded with status ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error connecting to ML service for full simulation:', error);
    return null;
  }
};
