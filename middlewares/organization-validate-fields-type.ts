import { Request, Response } from "express";
import { statePermited, statusPermited } from '../types/types.const';
export const validateFieldsType = (req: Request, res: Response, next: () => void) => {

    const { body } = req;

    if ('name' in body) {
        if (!(typeof body.name === 'string') || body.name == '') {
            res.status(400).json({
                "errors": [
                    {
                        "msg": "Name is not valid- require string",
                        "param": "name",
                        "location": "body"
                    }
                ]
            });
        }
    }

    if ('status' in body) {

        const value = parseInt(body.status);
        console.log(value);
        if (isNaN(value) || !statusPermited.includes(value)) {
            return res.status(400).json({
                "errors": [
                    {
                        "msg": `Status is not valid- permited ${statusPermited}`,
                        "param": "status",
                        "location": "body"
                    }
                ]
            });
        }
    }

    next();

}



