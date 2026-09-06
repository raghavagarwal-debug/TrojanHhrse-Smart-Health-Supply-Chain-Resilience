import { Router } from 'express';
import { submitHealthReport, submitVaccinationRecord } from '../controllers/report.controller';

const router = Router();

router.post('/', submitHealthReport);
router.post('/vaccination', submitVaccinationRecord);

export default router;
