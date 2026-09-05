import { Request, Response } from 'express';
import { prisma } from '../prisma/client';

export const getAlerts = async (req: Request, res: Response) => {
  try {
    const alerts = await prisma.alert.findMany({
      where: { status: 'ACTIVE' },
      include: { phc: true },
      orderBy: { createdAt: 'desc' },
    });
    res.json(alerts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch alerts' });
  }
};

export const resolveAlert = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const alert = await prisma.alert.update({
      where: { id },
      data: { status: 'RESOLVED', resolvedAt: new Date() },
    });
    res.json(alert);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to resolve alert' });
  }
};
