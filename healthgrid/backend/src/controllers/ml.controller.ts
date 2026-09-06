import { Request, Response } from 'express';
import { prisma } from '../prisma/client';
import { runFullSimulationPrediction } from '../services/ai.service';
import { z } from 'zod';

const predictSchema = z.object({
  date: z.string().optional(),
  phc_id: z.string(),
  state: z.string().optional(),
  district: z.string().optional(),
  city: z.string().optional(),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
  medicine: z.string().optional(),
  medicine_category: z.string().optional(),
  patient_count: z.number().default(0),
  opd_count: z.number().default(0),
  ipd_count: z.number().default(0),
  disease_cases: z.number().default(0),
  mortality: z.number().default(0),
  opening_stock: z.number().default(0),
  received_quantity: z.number().default(0),
  dispensed_quantity: z.number().default(0),
  closing_stock: z.number().default(0),
  current_stock: z.number().default(0),
  daily_consumption: z.number().default(0),
  previous_7_day_demand: z.number().default(0),
  previous_30_day_demand: z.number().default(0),
  supply_lead_time: z.number().default(0),
  incoming_supply: z.number().default(0),
  bed_occupancy: z.number().default(0),
  medicine_availability: z.number().default(0),
  temperature: z.number().default(0),
  rainfall: z.number().default(0),
  humidity: z.number().default(0),
  vaccination_coverage: z.number().default(0)
});

export const predictML = async (req: Request, res: Response) => {
  try {
    const validatedData = predictSchema.parse(req.body);
    
    // Fallback date if not provided
    if (!validatedData.date) {
      validatedData.date = new Date().toISOString().split('T')[0];
    }
    
    // Call FastAPI ML Service
    const mlResponse = await runFullSimulationPrediction(validatedData);
    
    if (!mlResponse) {
      return res.status(503).json({ error: 'AI service temporarily unavailable' });
    }

    // Attempt to resolve medicine ID if we have a medicine name
    let medicineId = 'unknown-med-id';
    if (validatedData.medicine) {
      const med = await prisma.medicine.findFirst({ where: { name: validatedData.medicine } });
      if (med) medicineId = med.id;
    }

    // Save to PostgreSQL if PHC exists
    const phcExists = await prisma.pHC.findUnique({ where: { id: validatedData.phc_id } });
    if (phcExists) {
      await prisma.mLPrediction.create({
        data: {
          facility_id: validatedData.phc_id,
          medicine_id: medicineId,
          predicted_7_day_demand: mlResponse.predicted_7_day_demand,
          stockout_probability: mlResponse.stockout_probability,
          risk_level: mlResponse.risk_level,
          estimated_days_of_stock: mlResponse.estimated_days_of_stock,
          predicted_shortage_units: mlResponse.predicted_shortage_units,
          model_version: 'v1.0'
        }
      });
    }

    res.json(mlResponse);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: 'Invalid payload format', details: error.errors });
    }
    console.error('Error in predictML:', error);
    res.status(500).json({ error: 'Internal Server Error during prediction' });
  }
};
