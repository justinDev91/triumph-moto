import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreateMotorcycleDto } from '../tdo/create-motorcycle.tdo';

@Injectable({
  providedIn: 'root',
})
export class MotorcycleService {
  private readonly apiUrl = 'http://localhost:3000/motorcycles';

  constructor(private readonly http: HttpClient) {}

  createMotorcycle(createMotorcycleDto: CreateMotorcycleDto): Observable<any> {
    return this.http.post(`${this.apiUrl}`, createMotorcycleDto);
  }

  updateMileage(id: string, mileage: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}/mileage`, mileage);
  }

  updateMotorcycleStatus(id: string, status: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}/status`, status);
  }

  updateServiceDetails(id: string, mileage: number, date: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}/service`, {mileage, date});
  }

  getMotorcycleCompanyDetails(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}/company`);
  }

  getMotorcycleConcessionDetails(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}/concession`);
  }

  assignMotorcycleToCompany(id: string, companyId: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}/company/${companyId}`, {});
  }

  assignMotorcycleToConcession(id: string, concessionId: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}/concession/${concessionId}`, {});
  }

  removeMotorcycleFromCompany(id: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}/remove-company`, {});
  }

  removeMotorcycleFromConcession(id: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}/remove-concession`, {});
  }

  checkServiceStatus(id: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/${id}/service-status`);
  }

  getAllMotorcycles(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`);
  }

  getMotorcycleById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  deleteMotorcycle(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}

