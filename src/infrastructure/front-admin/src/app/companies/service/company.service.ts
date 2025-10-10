import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Company } from '../../shared/models/company.model';
import { Driver } from '../../shared/models/driver.model';

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  private readonly apiUrl = 'http://localhost:3000/companies';

  constructor(private readonly http: HttpClient) {}

  // createCompany(createCompanyDto: CreateCompanyDto): Observable<Company> {
  //   return this.http.post<Company>(`${this.apiUrl}`, createCompanyDto);
  // }

  getAllCompanies(): Observable<Company[]> {
    return this.http.get<Company[]>(`${this.apiUrl}`);
  }

  getCompanyById(companyId: string): Observable<Company> {
    return this.http.get<Company>(`${this.apiUrl}/${companyId}`);
  }

  // updateCompanyName(
  //   companyId: string,
  //   updateCompanyNameDto: UpdateCompanyNameDto
  // ): Observable<Company> {
  //   return this.http.put<Company>(`${this.apiUrl}/${companyId}`, updateCompanyNameDto);
  // }

  // addConcessionToCompany(
  //   companyId: string,
  //   addConcessionToCompanyDto: AddConcessionToCompanyDto
  // ): Observable<Company> {
  //   return this.http.post<Company>(`${this.apiUrl}/${companyId}/concessions`, addConcessionToCompanyDto);
  // }

  removeConcessionFromCompany(companyId: string, concessionId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${companyId}/concessions/${concessionId}`);
  }

  // addDriverToCompany(
  //   companyId: string,
  //   addDriverToCompanyDto: AddDriverToCompanyDto
  // ): Observable<Company> {
  //   return this.http.post<Company>(`${this.apiUrl}/${companyId}/drivers`, addDriverToCompanyDto);
  // }

  getCompanyDrivers(companyId: string): Observable<Driver[]> {
    return this.http.get<Driver[]>(`${this.apiUrl}/${companyId}/drivers`);
  }

  removeDriverFromCompany(companyId: string, driverId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${companyId}/drivers/${driverId}`);
  }

  // addMotorcycleToCompany(
  //   companyId: string,
  //   addMotorcycleToCompanyDto: AddMotorcycleToCompanyDto
  // ): Observable<Company> {
  //   return this.http.post<Company>(`${this.apiUrl}/${companyId}/motorcycles`, addMotorcycleToCompanyDto);
  // }

  removeMotorcycleFromCompany(companyId: string, motorcycleId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${companyId}/motorcycles/${motorcycleId}`);
  }
}
