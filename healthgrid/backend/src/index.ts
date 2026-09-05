import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { prisma } from './prisma/client';
import phcRoutes from './routes/phc.routes';
import alertRoutes from './routes/alert.routes';
import simulationRoutes from './routes/simulation.routes';
import aiRoutes from './routes/ai.routes';
import authRoutes from './routes/auth.routes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet());
app.use(cors({ origin: process.env.FRONTEND_URL || '*' }));
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/api/phcs', phcRoutes);
app.use('/api/alerts', alertRoutes);
app.use('/api/simulation', simulationRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/auth', authRoutes);

// Health Check
app.get('/health', async (req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.status(200).json({ status: 'ok', db: 'connected' });
  } catch (error) {
    res.status(500).json({ status: 'error', db: 'disconnected' });
  }
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

// Global Error Handler
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 HEALTHGRID Backend running on http://localhost:${PORT}`);
});
