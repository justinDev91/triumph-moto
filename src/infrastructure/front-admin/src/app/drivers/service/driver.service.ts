import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Driver } from '../../shared/models/driver.model';
import { DrivingRecord } from '../../shared/models/driving-record.model';

@Injectable({
  providedIn: 'root',
})
export class DriverService {
  private readonly apiUrl = 'http://localhost:3000/drivers';

  constructor(private readonly http: HttpClient) {}

  createDriver(driverData: Partial<Driver>): Observable<Driver> {
    return this.http.post<Driver>(`${this.apiUrl}`, driverData);
  }

  getAllDrivers(): Observable<Driver[]> {
    return this.http.get<Driver[]>(`${this.apiUrl}`);
  }

  getDriverById(id: string): Observable<Driver> {
    return this.http.get<Driver>(`${this.apiUrl}/${id}`);
  }

  deleteDriver(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  addDrivingRecord(driverId: string, record: DrivingRecord): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${driverId}/add-record`, record);
  }

  checkIncidentHistory(driverId: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/${driverId}/check-incidents`);
  }

  updateContactInfo(driverId: string, contactInfo: {}): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${driverId}/update-contact`, contactInfo);
  }

  updateExperience(driverId: string, experience: number): Observable<Driver> {
    return this.http.put<Driver>(`${this.apiUrl}/${driverId}/update-experience`, experience);
  }

  getCompanyDetails(driverId: string): Observable<object> {
    return this.http.get<object>(`${this.apiUrl}/${driverId}/company-details`);
  }

  removeDriverFromCompany(driverId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${driverId}/remove-from-company`);
  }

  assignDriverToCompany(driverId: string, companyId: string): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/${driverId}/assign-to-company/${companyId}`, {});
  }
}
