import { Request, Response } from "express";

export const getVerificationCodes = (req: Request, res: Response) => {

    const repositories = [
        {
            id: 1,
            state: 604,
        },
        {
            id: 2,
            state: 605,
        },
        {
            id: 3,
            state: 606,
        }
    ];

    res.json({
        repositories
    });
}