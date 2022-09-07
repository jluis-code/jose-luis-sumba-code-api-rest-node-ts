import { Router } from "express";
import { check } from "express-validator"

import { getOrganizationList, createOrganization, updateOrganization, deleteOrganization } from '../controller/organization.controller';
import { validateFields } from "../middlewares/validate-fields";
import { validateFieldsType } from '../middlewares/organization-validate-fields-type';

const router = Router();

router.get('/', getOrganizationList);

router.post('/', [
    check('name', 'Name is required').not().isEmpty(),
    check('url', 'Url is required').not().isEmpty(),
    validateFields,
    validateFieldsType,
], createOrganization);

router.put('/:id',
    [
        validateFieldsType
    ],
    updateOrganization);

router.delete('/:id', deleteOrganization);

export default router;