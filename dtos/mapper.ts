import { extensions } from 'sequelize/types/utils/validator-extras';
import type Repository from '../models/repository';
import Tribe from '../models/tribe';
import { RepositoryMetricsDTO } from './repositoryMetricsDTO';

export const mapRepositoryMetricResponse = (repo: InstanceType<typeof Repository>[], tribe: InstanceType<typeof Tribe>) => {


    const tribeData = tribe.get();
    const resultData: RepositoryMetricsDTO[] = [];

    repo.forEach(element => {
        const repoData = element.get();
        const metricData = repoData.metric.get();
        const data: RepositoryMetricsDTO = {
            id: repoData.id_repository,
            name: repoData.name,
            tribe: tribeData.name,
            coverage: `${metricData.coverage * 100}%`,
            codeSmells: metricData.codeSmells,
            bugs: metricData.bugs,
            vulnerabilities: metricData.vulnerabilities,
            hotspots: metricData.hotspots,
            verificationState: '',
            state: repoData.state,
        }
        console.log(repoData.name);

        resultData.push(data);
    });


    return resultData;
}