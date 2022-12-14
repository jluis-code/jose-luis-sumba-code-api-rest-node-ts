export const getCreateOrganizationResponseDTO = (org: { id_organization: string, name: string }) => ({
    message: 'Success create organization',
    id: org.id_organization,
    name: org.name
});


export const getUpdateOrganizationResponseDTO = (org: { id_organization: string, name: string }) => ({
    message: 'Success update organization',
    id: org.id_organization,
    name: org.name
});

export const getDeleteOrganizationResponseDTO = (org: { id_organization: string, name: string }) => ({
    message: 'Success delete organization',
    id: org.id_organization,
    name: org.name
});

export interface OrganizationDataRequest {
    name: string;
    status: number | null,
    url: string
}

export interface OrganizationData {
    id: number;
    name: string;
    status: number,
    url: string
}