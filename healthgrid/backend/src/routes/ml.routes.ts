import { Router } from 'express';
import { predictML } from '../controllers/ml.controller';

const router = Router();

router.post('/predict', predictML);

export default router;
