import { Request, Response } from "express";
import { statePermited } from "../types/types.const";
export const repostoryMetricValidateFieldsType = (req: Request, res: Response, next: () => void) => {

    //const { year = -1, coverage = 75, state = 'E' } = req.query;

    const query = req.query;

    if ('year' in query) {
        const value = parseInt(query.year as string);
        console.log(value);
        if (isNaN(value) || value <= 0) {
            return res.status(400).json({
                "errors": [
                    {
                        "msg": "year is not valid- require a number > 0",
                        "param": "year",
                        "location": "query"
                    }
                ]
            });
        }
    }

    if ('coverage' in query) {
        const value = parseInt(query.coverage as string);
        console.log(value);
        if (isNaN(value) || value < 0) {
            return res.status(400).json({
                "errors": [
                    {
                        "msg": "coverage is not valid- require a number >= 0",
                        "param": "coverage",
                        "location": "query"
                    }
                ]
            });
        }
    }

    if ('state' in query) {

        const value = query.state as string;
        console.log(value);
        if (!statePermited.includes(value)) {
            return res.status(400).json({
                "errors": [
                    {
                        "msg": `Status is not valid- permited ${statePermited}`,
                        "param": "status",
                        "location": "body"
                    }
                ]
            });
        }
    }

    next();

}



