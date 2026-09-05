import { Router } from 'express';
import { explainRisk, getForecast } from '../controllers/ai.controller';

const router = Router();

router.post('/explain', explainRisk);
router.get('/forecast', getForecast);

export default router;
