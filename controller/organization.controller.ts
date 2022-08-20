import { Request, Response } from "express";
import { getCreateOrganizationResponseDTO, getUpdateOrganizationResponseDTO, OrganizationData, OrganizationDataRequest } from '../dtos/organizationDTOs';
import Organization from '../models/organization';
import { Error400, NotFoundError } from '../lib/error';

export const getOrganizationList = async (req: Request, res: Response) => {

    const result = await Organization.findAll();

    const resultData = result.map((element) => {
        const elementAsJson = element.get();
        const data: OrganizationData = {
            id: elementAsJson.id_organization,
            name: elementAsJson.name,
            status: elementAsJson.status
        };
        return data;
    }
    );


    return res.json({
        resultData
    });
}

export const createOrganization = async (req: Request, res: Response) => {

    const { body } = req;
    const data: OrganizationDataRequest = {
        name: body.name,
        status: body.status ?? null
    };

    try {

        const existe = await Organization.findOne({
            where: {
                name: data.name
            }
        });

        if (existe) {
            return res.json(new Error400(`Organization with name ${data.name} already exist`));
        }

        const organization = await Organization.create({ name: data.name, status: data.status ?? 1 });
        const organizationAsJson = organization.get();

        if (organization) {
            return res.json(getCreateOrganizationResponseDTO(organizationAsJson));
        } else {
            return res.json(new Error400('Organization not created'));
        }
    } catch (error) {
        console.log(error);
        return res.json(new Error400('Organization not created'));
    }
}


export const updateOrganization = async (req: Request, res: Response) => {

    const { id } = req.params;
    const { body } = req;
    const data: OrganizationDataRequest = {
        name: body.name,
        status: body.status ?? null
    };

    try {
        const organization = await Organization.findByPk(id);
        if (!organization) {
            return res.json(new NotFoundError(`Organization with id ${id} not found`));
        }
        await organization.update(data);
        return res.json(getUpdateOrganizationResponseDTO(organization.get()));
    } catch (error) {
        console.log(error);
        return res.json(new Error400('Organization not updated'));
    }

}

export const deleteOrganization = async (req: Request, res: Response) => {

    const { id } = req.params;
    try {
        const organization = await Organization.findByPk(id);
        if (!organization) {
            return res.json(new NotFoundError(`Organization with id ${id} not found`));
        }
        const organizationAsJson = organization.get();
        const data: OrganizationDataRequest = {
            name: organizationAsJson.name,
            status: 0
        };
        await organization.update(data);
        return res.json(getUpdateOrganizationResponseDTO(organization.get()));
    } catch (error) {
        console.log(error);
        return res.json(new Error400('Organization not updated'));
    }
}