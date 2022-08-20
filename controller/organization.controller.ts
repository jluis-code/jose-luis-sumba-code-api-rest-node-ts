import { Request, Response } from "express";

export const getOrganizationLits = async (req: Request, res: Response) => {

    return res.json({
        msg: 'getOrganizationLits'
    });


}

export const createOrganization = async (req: Request, res: Response) => {

    return res.json({
        msg: 'createOrganization'
    });

}


export const updateOrganization = async (req: Request, res: Response) => {

    return res.json({
        msg: 'updateOrganization'
    });
}

export const deleteOrganization = (req: Request, res: Response) => {

    return res.json({
        msg: 'deleteUsuario'
    });
}