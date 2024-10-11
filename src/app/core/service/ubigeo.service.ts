import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DepartmentDto, DistrictDto, ProvinceDto } from '@core/models/ubigeo.dto';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UbigeoService {
  private UBIGEO_DEPARTMENT_URL = `${environment.APIR_URL}/ubigeo/departments`;
  private UBIGEO_PROVINCE_URL = `${environment.APIR_URL}/ubigeo/provinces`;
  private UBIGEO_DISTRICT_URL = `${environment.APIR_URL}/ubigeo/districts`;

  constructor(private http: HttpClient) { }

  getDepartments(): Observable<DepartmentDto[]> {
    return this.http.get<DepartmentDto[]>(this.UBIGEO_DEPARTMENT_URL);
  }

  getProvinces(departmentId: string): Observable<ProvinceDto[]> {
    return this.http.get<ProvinceDto[]>(`${this.UBIGEO_PROVINCE_URL}/${departmentId}`);
  }

  getDistricts(departmentId: string, provinceId: string): Observable<DistrictDto[]> {
    return this.http.get<DistrictDto[]>(`${this.UBIGEO_DISTRICT_URL}/${departmentId}/${provinceId}`);
  }
}
