export interface RepositoryMetricsDTO {
    id: string;
    name: string;
    tribe: string,
    coverage: string,
    codeSmells: number,
    bugs: number,
    vulnerabilities: number,
    hotspots: number,
    verificationState: string,
    state: string,
}