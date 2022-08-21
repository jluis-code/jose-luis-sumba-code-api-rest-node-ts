import { Router } from "express";
import { getMetricsByTribe } from '../controller/metrics.controller';

const router = Router();

router.get('/:id_tribe', getMetricsByTribe);

export default router;