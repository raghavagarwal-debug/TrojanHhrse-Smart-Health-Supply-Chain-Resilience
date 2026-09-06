import { Request, Response } from 'express';
import { prisma } from '../prisma/client';
import { z } from 'zod';

const healthReportSchema = z.object({
  facility_id: z.string(),
  patient_count: z.number().int().min(0),
  disease_cases: z.number().int().min(0),
  mortality: z.number().int().min(0),
  bed_occupancy: z.number().min(0).max(1).optional(),
  vaccination_coverage: z.number().min(0).max(1).optional(),
});

const vaccinationSchema = z.object({
  facility_id: z.string(),
  vaccine: z.string(),
  doses_administered: z.number().int().min(0),
  target_population: z.number().int().min(0),
  coverage: z.number().min(0).max(1).optional(),
});

export const submitHealthReport = async (req: Request, res: Response) => {
  try {
    const data = healthReportSchema.parse(req.body);
    const report = await prisma.healthReport.create({
      data: {
        facility_id: data.facility_id,
        patient_count: data.patient_count,
        disease_cases: data.disease_cases,
        mortality: data.mortality,
        bed_occupancy: data.bed_occupancy || 0,
        vaccination_coverage: data.vaccination_coverage || 0
      }
    });
    res.status(201).json(report);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: 'Validation failed', details: error.errors });
    }
    console.error(error);
    res.status(500).json({ error: 'Failed to submit report' });
  }
};

export const submitVaccinationRecord = async (req: Request, res: Response) => {
  try {
    const data = vaccinationSchema.parse(req.body);
    const record = await prisma.vaccinationRecord.create({
      data: {
        facility_id: data.facility_id,
        vaccine: data.vaccine,
        doses_administered: data.doses_administered,
        target_population: data.target_population,
        coverage: data.coverage || (data.target_population > 0 ? data.doses_administered / data.target_population : 0)
      }
    });
    res.status(201).json(record);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: 'Validation failed', details: error.errors });
    }
    console.error(error);
    res.status(500).json({ error: 'Failed to submit vaccination record' });
  }
};
