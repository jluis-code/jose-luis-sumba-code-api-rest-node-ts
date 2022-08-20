import { Router } from "express";
import { getOrganizationList, createOrganization, updateOrganization, deleteOrganization } from '../controller/organization.controller';

const router = Router();

router.get('/', getOrganizationList);

router.post('/', createOrganization);

router.put('/:id', updateOrganization);

router.delete('/:id', deleteOrganization);

export default router;