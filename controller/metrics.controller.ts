import { Request, Response } from "express";
import { Error400, NotFoundError } from "../lib/error";
import { mapRepositoryMetricResponse } from '../dtos/mapper';
import { requestVerificationState } from "../services/verification-state-repository.service";
import { getFilters } from "../lib/helpers";
import { getTribeById } from '../services/tribe.service';
import { getRepositories } from '../services/repository.service';


export const getMetricsByTribe = async (req: Request, res: Response) => {

    const { id_tribe } = req.params;

    try {


        let { year_query, coverage_query, state_query } = getFilters(req);

        const tribe = await getTribeById(id_tribe);

        if (!tribe) {
            return res.status(404).json(new NotFoundError(`The Tribe is not registered`));
        }

        const repositories = await getRepositories(id_tribe, state_query, year_query, coverage_query);

        if (!repositories || (Array.isArray(repositories) && repositories.length == 0)) {
            return res.status(404).json(new NotFoundError('La Tribu no tiene repositorios que cumplan con la cobertura necesaria'));
        }

        //Get VerificationCodes
        const codes = await requestVerificationState();
        if (!codes.success) {
            return res.status(400).json(new Error400('Information not available'));
        }

        const data = mapRepositoryMetricResponse(repositories, tribe, codes);

        res.json({
            repositories: data,
        });

    } catch (error) {
        console.log(error);
        return res.status(400).json(new Error400('Information not available'));
    }

}