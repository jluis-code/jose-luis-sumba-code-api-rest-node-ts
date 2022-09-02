import type Repository from '../models/repository';
import Tribe from '../models/tribe';
import { RepositoryMetricsDTO } from './repositoryMetricsDTO';
import { getVerificationCodes } from '../controller/mockup.controller';
import { State, VerificationState } from '../types/types.enums';

export const mapRepositoryMetricResponse = (repo: InstanceType<typeof Repository>[] | [],
    tribe: InstanceType<typeof Tribe>,
    codes: { success: boolean, status: number, data: { repositories: { id: number, state: number }[] } }) => {


    const tribeData = tribe.get();
    const organizationData = tribeData.organization.get();
    const resultData: RepositoryMetricsDTO[] = [];

    //GetCodes
    if (codes.success && codes.data) {
        console.log(codes.data.repositories);
    }

    repo.forEach(element => {
        const repoData = element.get();
        const metricData = repoData.metric.get();
        const data: RepositoryMetricsDTO = {
            id: repoData.id_repository,
            name: repoData.name,
            tribe: tribeData.name,
            organization: organizationData.name,
            coverage: `${metricData.coverage * 100}%`,
            codeSmells: metricData.codeSmells,
            bugs: metricData.bugs,
            vulnerabilities: metricData.vulnerabilities,
            hotspots: metricData.hotspots,
            verificationState: getVerificationCode(codes.data.repositories, repoData.id_repository),
            state: getStatusName(repoData.state),
        }
        console.log(repoData.name);

        resultData.push(data);
    });


    return resultData;
}

const getVerificationCode = (repositories: { id: number, state: number }[], id_repositoy: number) => {


    const item = repositories.find(element => element.id == id_repositoy);
    return item && item.state ? getVerificationCodeName(item.state) : '';

}

const getVerificationCodeName = (code: number) => {


    switch (code) {
        case VerificationState.Verificado:
            return "Verificado"
        case VerificationState.Aprobado:
            return "Aprobado"
        case VerificationState.EnEspera:
            return "En Espera"
        default:
            return "-"
    }
}


const getStatusName = (code: string) => {


    switch (code) {
        case State.Enable:
            return "Habilitado"
        case State.Disabled:
            return "Desabilitado"
        case State.Archived:
            return "Archividado"
        default:
            return "-"
    }
}