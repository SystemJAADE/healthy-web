import { Gender } from "app/models/gender.enum";

export interface RegisterDto {
    username: string;
    password: string;
    firstSurname: string;
    secondSurname: string;
    firstName: string;
    middleName?: string;
    documentIdentity: string;
    gender: Gender;
    cellPhone: string;
    homePhone?: string;
    address: string;
    ubigeoDepartmentId: string;
    ubigeoProvinceId: string;
    ubigeoDistrictId: string;  
}
