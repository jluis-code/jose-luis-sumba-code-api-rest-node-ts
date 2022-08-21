import { Request, Response } from "express";
import Tribe from "../models/tribe";
import Repository from '../models/repository';
import Metrics from '../models/metrics';
import { Error400, NotFoundError } from "../lib/error";
import Organization from "../models/organization";

export const getMetricsByTribe = async (req: Request, res: Response) => {

    const { id_tribe } = req.params;

    try {

        const tribe = await Tribe.findByPk(id_tribe);
        if (!tribe) {
            return res.json(new NotFoundError(`The Tribe is not registered`));
        }

        const repositories = await Repository.findOne({
            where: {
                id_tribe: id_tribe
            },
            include: Metrics
        });

        res.json({
            id: id_tribe,
            tribe
        });
    } catch (error) {
        console.log(error);
        return res.json(new Error400('Information not available'));
    }

}