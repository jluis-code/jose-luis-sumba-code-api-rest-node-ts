import { Request, Response } from "express";
import { mapRepositoryMetricResponse } from '../dtos/mapper';
import { requestVerificationState } from "../services/verificationStateServer";
import { getFilters } from "../lib/helpers";
import { getTribeById } from '../services/tribe.service';
import { getRepositories } from '../services/repository.service';
const CsvParser = require("json2csv").Parser;


export const getCsv = async (req: Request, res: Response) => {

    const { id_tribe } = req.params;
    let have_data = false;
    let no_data_msg = "";

    try {


        let { year_query, coverage_query, state_query } = getFilters(req);

        const tribe = await getTribeById(id_tribe);

        if (!tribe) {
            no_data_msg = `The Tribe is not registered`;
        } else {
            const repositories = await getRepositories(id_tribe, state_query, year_query, coverage_query);
            if (!repositories || (Array.isArray(repositories) && repositories.length == 0)) {
                no_data_msg = `La Tribu no tiene repositorios que cumplan con la cobertura necesaria`;
            } else {
                //Get VerificationCodes
                const codes = await requestVerificationState();
                const data = mapRepositoryMetricResponse(repositories, tribe, codes);
                have_data = true;
                returnCsv(
                    res,
                    ["id", "name", "tribe", "organization", "coverage", "bugs", "vulnerabilities", "verificationState", "state"],
                    data
                )
            }
        }
    } catch (error) {
        console.log(error);
        no_data_msg = `Information not available`;
    }

    returnCsv(res, ['no_data_msg'], [{ no_data_msg }])

}

const returnCsv = (res: Response, fields: string[], data: any[]) => {

    const csvFields = fields;
    const csvParser = new CsvParser({ csvFields });
    const csvData = csvParser.parse(data);

    res.status(200).end(csvData);

}