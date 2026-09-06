import { Request, Response } from 'express';
import { prisma } from '../prisma/client';

export const getPHCs = async (req: Request, res: Response) => {
  try {
    const phcs = await prisma.pHC.findMany({
      include: {
        districtRel: { include: { state: true } },
        bedCapacity: true,
        staff: true,
        riskScores: { orderBy: { createdAt: 'desc' }, take: 1 },
      },
    });
    res.json(phcs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch PHCs' });
  }
};

export const getPHCById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const phc = await prisma.pHC.findUnique({
      where: { id },
      include: {
        districtRel: { include: { state: true } },
        bedCapacity: true,
        staff: true,
        inventories: {
          include: { medicine: true },
        },
        forecasts: { orderBy: { createdAt: 'desc' }, take: 10 },
        riskScores: { orderBy: { createdAt: 'desc' }, take: 1 },
      },
    });
    if (!phc) return res.status(404).json({ error: 'PHC not found' });
    res.json(phc);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch PHC details' });
  }
};

export const getDashboardStats = async (req: Request, res: Response) => {
  try {
    const totalPhcs = await prisma.pHC.count();
    const criticalPhcs = await prisma.riskScore.count({
      where: { category: 'CRITICAL' },
    });
    
    // In a real app we'd fetch actual latest risk scores per PHC carefully
    const beds = await prisma.bedCapacity.aggregate({
      _sum: { totalBeds: true, occupiedBeds: true },
    });
    
    res.json({
      totalPhcs,
      operationalPhcs: totalPhcs - criticalPhcs,
      criticalPhcs,
      bedsAvailable: (beds._sum.totalBeds || 0) - (beds._sum.occupiedBeds || 0),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
};

export const updateInventory = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { medicineId, currentStock } = req.body;
    
    // Find or create inventory record
    const inventory = await prisma.inventory.upsert({
      where: {
        facility_id_medicineId: { facility_id: id, medicineId: medicineId }
      },
      update: {
        currentStock: Number(currentStock)
      },
      create: {
        facility_id: id,
        medicineId: medicineId,
        currentStock: Number(currentStock),
        dailyConsumption: 10,
        reorderLevel: 50
      }
    });
    
    res.json(inventory);
  } catch (error) {
    console.error('Update inventory error:', error);
    res.status(500).json({ error: 'Failed to update inventory' });
  }
};

export const updateBedCapacity = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { occupiedBeds, totalBeds } = req.body;
    
    const beds = await prisma.bedCapacity.update({
      where: { phcId: id },
      data: {
        occupiedBeds: Number(occupiedBeds),
        ...(totalBeds ? { totalBeds: Number(totalBeds) } : {})
      }
    });
    
    res.json(beds);
  } catch (error) {
    console.error('Update bed capacity error:', error);
    res.status(500).json({ error: 'Failed to update bed capacity' });
  }
};

