import { Router } from "express";
import { getMetricsByTribe } from '../controller/metrics.controller';
import { getCsv } from '../controller/reports.controller';
import { repostoryMetricValidateFieldsType } from '../middlewares/repositpry-metric-validate-fields-type';

const router = Router();

router.get('/:id_tribe', [
    repostoryMetricValidateFieldsType
], getCsv);

export default router;