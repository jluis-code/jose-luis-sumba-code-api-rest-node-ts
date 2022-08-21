const { Op } = require("sequelize");
import db from "../db/connection";
import Metrics from "../models/metrics";
import Repository from "../models/repository";

export const getRepositories = async (id_tribe: string, state: string, year: number, coverage: number) => {

    const repositories = await Repository.findAll({
        where: {
            id_tribe: id_tribe,
            state: state,
            andOp: db.where(db.fn('date_part', 'year', db.col('create_time')), year)
        },
        include: {
            model: Metrics,
            where: {
                coverage: {
                    [Op.gt]: coverage
                }
            }
        }
    });

    return repositories;
}