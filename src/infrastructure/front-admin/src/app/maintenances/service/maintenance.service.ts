import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreateMaintenanceDto } from '../dto/create-maintenance.tdo';

@Injectable({
  providedIn: 'root',
})
export class MaintenanceService {
  private readonly apiUrl = 'http://localhost:3000/maintenance';

  constructor(private readonly http: HttpClient) {}

  createMaintenance(createMaintenanceDto: CreateMaintenanceDto): Observable<any> {
    return this.http.post(`${this.apiUrl}`, createMaintenanceDto);
  }

  deleteMaintenance(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  findMaintenanceByConcessionId(concessionId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/concession/${concessionId}`);
  }

  findMaintenanceByMotorcycleId(motorcycleId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/motorcycle/${motorcycleId}`);
  }

  getAllMaintenanceRecords(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/all`);
  }

  getMaintenanceById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  markMaintenanceAsCompleted(id: string): Observable<boolean> {
    return this.http.put<boolean>(`${this.apiUrl}/complete/${id}`, {});
  }

  predictNextMaintenanceDate(id: string): Observable<Date> {
    return this.http.get<Date>(`${this.apiUrl}/next-maintenance-date/${id}`);
  }

  scheduleNextMaintenance(id: string): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/schedule-next-maintenance/${id}`, {});
  }

  updateMaintenanceConcession(maintenanceId: string, concession: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/update-concession/${maintenanceId}`, concession);
  }

  updateMaintenanceDetails(id: string, maintenanceType: string, date: Date, cost: number): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/update-details/${id}`, { maintenanceType, date, cost });
  }

  updateMaintenance(id: string, maintenanceType: string, date: Date, cost: number): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/update/${id}`, { maintenanceType, date, cost });
  }

  checkIfMaintenanceOverdue(id: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/overdue/${id}`);
  }
}
