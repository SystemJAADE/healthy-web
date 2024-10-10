import { Gender } from "app/models/gender.enum";

export interface Role {
    id: number;
    name: string;
    subroles: Subrole[];
}
  
export interface Subrole {
    id: number;
    name: string;
}

export interface AccountDto {

    id: string;
    medicalRecordNumber: number;
    isBlocked: boolean;
    firstSurname: string;
    secondSurname: string;
    firstName: string;
    middleName?: string;
    documentIdentity: string;
    gender: Gender;
    cellPhone: string;
    homePhone?: string;
    address: string;
    pathImg?: string;
    ubigeoDepartmentId: string;
    ubigeoDistrictId: string;
    ubigeoProvinceId: string;
    credentialId: string;
    createdAt: Date;
    updatedAt: Date;
    permission: Role[];

}