import { Router } from "express";
import { getOrganizationLits, createOrganization, updateOrganization, deleteOrganization } from '../controller/organization.controller';

const router = Router();

router.get('/', getOrganizationLits);

router.post('/', createOrganization);

router.put('/', updateOrganization);

router.delete('/', deleteOrganization);

export default router;