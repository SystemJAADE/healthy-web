import { DocumentType } from "app/models/documenttype.enum";
import { Gender } from "app/models/gender.enum";

export interface RegisterDto {
    username: string;
    password: string;
    firstSurname: string;
    secondSurname: string;
    firstName: string;
    middleName?: string;
    documentType: DocumentType;
    documentIdentity: string;
    gender: Gender;
    cellPhone: string;
    address: string;
    ubigeoDepartmentId: string;
    ubigeoProvinceId: string;
    ubigeoDistrictId: string;
    emailAddress: string;
}
