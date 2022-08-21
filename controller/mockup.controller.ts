import { Request, Response } from "express";

export const getVerificationCodes = (req: Request, res: Response) => {

    const repositories = [
        {
            id: 789666536831156226,
            state: 604,
        },
        {
            id: 789671519142707202,
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