import { Request, Response } from "express";
import Tribe from "../models/tribe";
import Repository from '../models/repository';
import Metrics from '../models/metrics';
import { Error400, NotFoundError } from "../lib/error";
import db from "../db/connection";
import Organization from '../models/organization';
import { mapRepositoryMetricResponse } from '../dtos/mapper';
const { Op } = require("sequelize");

export const getMetricsByTribe = async (req: Request, res: Response) => {

    const { id_tribe } = req.params;

    try {

        const tribe = await Tribe.findOne({
            where:
            {
                id_tribe
            },
            include: {
                model: Organization
            }
        });
        if (!tribe) {
            return res.status(404).json(new NotFoundError(`The Tribe is not registered`));
        }

        const currentYear = new Date().getFullYear();
        console.log(currentYear);


        const repositories = await Repository.findAll({
            where: {
                id_tribe: id_tribe,
                state: 'E',
                status: 'A',
                andOp: db.where(db.fn('date_part', 'year', db.col('create_time')), currentYear)
            },
            include: {
                model: Metrics,
                where: {
                    coverage: {
                        [Op.gt]: 0.75
                    }
                }
            }
        });

        if (!repositories) {
            return res.status(404).json(new NotFoundError('La Tribu no tiene repositorios que cumplan con la cobertura necesaria'));
        }

        const data = mapRepositoryMetricResponse(repositories, tribe);

        res.json({
            repositories: data,
        });

    } catch (error) {
        console.log(error);
        return res.status(400).json(new Error400('Information not available'));
    }

}