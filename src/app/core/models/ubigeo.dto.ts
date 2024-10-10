export interface DepartmentDto {
  id: string;
  name: string;
}

export interface ProvinceDto {
  id: string;
  name: string;
  departmentId: string;
}

export interface DistrictDto {
  id: string;
  name: string;
  departmentId: string;
  provinceId: string;
}