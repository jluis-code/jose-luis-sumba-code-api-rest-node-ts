import { Router } from "express";
import { getVerificationCodes } from "../controller/mockup.controller";

const router = Router();

router.get('/', getVerificationCodes);

export default router;