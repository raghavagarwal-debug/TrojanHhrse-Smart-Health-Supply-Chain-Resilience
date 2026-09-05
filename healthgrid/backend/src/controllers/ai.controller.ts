import { Request, Response } from 'express';
import { GoogleGenerativeAI } from '@google/generative-ai';

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
    
    // Mock ML forecast response
    const forecast = {
      phcId,
      medicineId,
      historical: [120, 125, 130, 145, 150, 148, 160],
      predicted: [165, 172, 180, 195, 210, 225, 240],
      confidenceInterval: {
        upper: [170, 180, 190, 210, 230, 250, 270],
        lower: [160, 165, 170, 180, 190, 200, 210],
      },
      insights: [
        'Demand is expected to increase by 31% over the next 7 days.',
        'Primary drivers: Increased patient footfall, seasonal disease trend.'
      ]
    };
    
    res.json(forecast);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to generate forecast' });
  }
};
