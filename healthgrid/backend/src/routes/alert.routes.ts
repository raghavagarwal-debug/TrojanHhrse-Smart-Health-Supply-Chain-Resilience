import { Router } from 'express';
import { getAlerts, resolveAlert } from '../controllers/alert.controller';

const router = Router();

router.get('/', getAlerts);
router.post('/:id/resolve', resolveAlert);

export default router;
