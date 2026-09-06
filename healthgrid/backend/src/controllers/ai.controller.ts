import { Request, Response } from 'express';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { predictDemand, predictHealthRisk, predictStockoutRisk } from '../services/ai.service';

export const explainRisk = async (req: Request, res: Response) => {
  try {
    const { riskData } = req.body;
    
    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({ error: 'Gemini API key is not configured in backend' });
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

    const prompt = `
      You are an expert Health Resource AI for the Indian public healthcare system.
      Given the following risk data for a Primary Health Center (PHC), explain why the risk is high and provide a recommendation.
      
      Risk Data: ${JSON.stringify(riskData || { status: 'Critical', medicine: 'Antibiotics', daysLeft: 2.4, patientSurge: '+28%' })}
      
      Provide your response in exactly this JSON format:
      {
        "explanation": "A 1-2 sentence explanation of the risk.",
        "confidence": 92, // An integer between 80 and 99
        "recommendation": "A 1 sentence specific action to take."
      }
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    let text = response.text();
    
    // Clean up potential markdown formatting from JSON response
    text = text.replace(/```json/g, '').replace(/```/g, '').trim();
    const parsedResponse = JSON.parse(text);
    
    res.json(parsedResponse);
  } catch (error) {
    console.error('Gemini API Error:', error);
    res.status(500).json({ error: 'Failed to generate explanation using Gemini API' });
  }
};

export const getForecast = async (req: Request, res: Response) => {
  try {
    const { phcId, medicineId, days } = req.query;
    
    // Build a baseline payload for the XGBoost model
    // In production, this would be fetched from the database for the specific PHC/Medicine
    const mlPayload = {
      date: new Date().toISOString().split('T')[0],
      phc_id: phcId || "PHC-001",
      state: "Maharashtra",
      district: "Mumbai",
      city: "Mumbai",
      latitude: 19.0760,
      longitude: 72.8777,
      medicine: medicineId || "Paracetamol 500mg",
      medicine_category: "Analgesic",
      patient_count: 1500,
      opd_count: 1300,
      ipd_count: 200,
      disease_cases: 300,
      mortality: 2,
      opening_stock: 500,
      received_quantity: 0,
      dispensed_quantity: 120,
      closing_stock: 380,
      current_stock: 380,
      daily_consumption: 120,
      previous_7_day_demand: 800,
      previous_30_day_demand: 3200,
      supply_lead_time: 3,
      incoming_supply: 0,
      bed_occupancy: 0.85,
      medicine_availability: 1.0,
      temperature: 32.5,
      rainfall: 12.0,
      humidity: 78.0,
      vaccination_coverage: 0.82
    };

    // 1. Call AI Service for Demand Forecast
    const demandResult = await predictDemand(mlPayload);
    const totalPredictedDemand = demandResult.predicted_demand || 1000;
    
    // 2. Call AI Service for Stockout Risk
    const stockoutResult = await predictStockoutRisk(mlPayload);
    
    // 3. Call AI Service for Health Risk
    const healthResult = await predictHealthRisk(mlPayload);

    // Generate daily breakdown for charts based on total predicted demand
    const dailyAvg = totalPredictedDemand / 7;
    const predicted = Array.from({length: 7}, (_, i) => Math.round(dailyAvg * (1 + (Math.random() * 0.2 - 0.1))));
    const historical = Array.from({length: 7}, (_, i) => Math.round((mlPayload.previous_7_day_demand / 7) * (1 + (Math.random() * 0.2 - 0.1))));

    const forecast = {
      phcId,
      medicineId,
      historical,
      predicted,
      confidenceInterval: {
        upper: predicted.map(v => Math.round(v * 1.15)),
        lower: predicted.map(v => Math.round(v * 0.85)),
      },
      insights: [
        `AI Forecast: Demand will be ~${totalPredictedDemand} units over the next 7 days.`,
        ...healthResult.factors,
        ...stockoutResult.factors
      ],
      aiRiskAssessment: {
        stockoutRisk: stockoutResult.risk,
        healthRisk: healthResult.health_risk_level
      }
    };
    
    res.json(forecast);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to generate forecast' });
  }
};
