import { Router } from "express";
import { getMetricsByTribe } from '../controller/metrics.controller';
import { getCsv } from '../controller/reports.controller';

const router = Router();

router.get('/:id_tribe', getCsv);

export default router;