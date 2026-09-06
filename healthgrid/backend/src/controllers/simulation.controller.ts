import { Request, Response } from 'express';
import { prisma } from '../prisma/client';

export const runSimulation = async (req: Request, res: Response) => {
  try {
    const { scenario, severity, duration } = req.body;
    // Mock simulation logic
    // We will just artificially inflate demand for antibiotics and increase footfall
    const phcs = await prisma.pHC.findMany({ include: { districtRel: true } });
    
    const impactResults = phcs.map((phc) => {
      let riskIncrease = 0;
      if (severity === 'High') riskIncrease = 30;
      else if (severity === 'Medium') riskIncrease = 15;
      
      return {
        phcId: phc.id,
        name: phc.name,
        demandIncreasePercent: riskIncrease + Math.floor(Math.random() * 10),
        footfallIncreasePercent: riskIncrease + 5,
        bedOccupancyIncreasePercent: riskIncrease / 2,
        newRiskScore: Math.min(100, Math.max(0, 100 - (riskIncrease * 2))), // Dummy formula
      };
    });

    const simulationResult = {
      scenario,
      severity,
      duration,
      impact: impactResults,
      responsePlan: [
        { action: 'Transfer antibiotics', source: 'District A', target: 'District B', quantity: 500 },
        { action: 'Activate extra beds', source: 'District B', target: 'District B', quantity: 20 },
      ]
    };
    
    res.json(simulationResult);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Simulation failed' });
  }
};
