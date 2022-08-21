import { Request, Response } from "express";
import Tribe from "../models/tribe";
import Repository from '../models/repository';
import Metrics from '../models/metrics';
import { Error400, NotFoundError } from "../lib/error";
import db from "../db/connection";
import Organization from '../models/organization';
import { mapRepositoryMetricResponse } from '../dtos/mapper';
import { requestVerificationState } from "../services/verificationStateServer";
const { Op } = require("sequelize");

export const getMetricsByTribe = async (req: Request, res: Response) => {

    const { id_tribe } = req.params;

    try {

        const { year = -1, coverage = 75, state = 'E' } = req.query;
        console.log({ year, state, coverage });

        const coverage_num: number = +coverage;
        const year_num: number = +year;
        console.log({ year_num, state, coverage_num });

        let year_query = year_num;
        const coverage_query = coverage_num / 100;

        if (year_query == -1) {
            year_query = new Date().getFullYear();
            console.log(year_query);
        }

        console.log({ year_query, state, coverage_query });

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


        const repositories = await Repository.findAll({
            where: {
                id_tribe: id_tribe,
                state: state,
                andOp: db.where(db.fn('date_part', 'year', db.col('create_time')), year_query)
            },
            include: {
                model: Metrics,
                where: {
                    coverage: {
                        [Op.gt]: coverage_query
                    }
                }
            }
        });

        console.log(repositories);

        if (!repositories || (Array.isArray(repositories) && repositories.length == 0)) {
            return res.status(404).json(new NotFoundError('La Tribu no tiene repositorios que cumplan con la cobertura necesaria'));
        }

        //Get VerificationCodes
        const codes = await requestVerificationState();

        const data = mapRepositoryMetricResponse(repositories, tribe, codes);

        res.json({
            repositories: data,
        });

    } catch (error) {
        console.log(error);
        return res.status(400).json(new Error400('Information not available'));
    }

}