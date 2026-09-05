import { Router } from 'express';
import { getPHCs, getPHCById, getDashboardStats, updateInventory, updateBedCapacity } from '../controllers/phc.controller';
import { verifyToken } from '../middleware/auth';

const router = Router();

router.get('/stats', getDashboardStats);
router.get('/', getPHCs);
router.get('/:id', getPHCById);

// Protected Data Entry Routes
router.post('/:id/inventory', verifyToken, updateInventory);
router.post('/:id/bed-capacity', verifyToken, updateBedCapacity);

export default router;
