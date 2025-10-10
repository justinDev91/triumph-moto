import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreateRepairDto } from '../dto/create-repair.dto';
import { CommonRepairActionEnum, Repair } from '../../shared/models/repair.model';

@Injectable({
  providedIn: 'root',
})
export class RepairService {
  private readonly apiUrl = 'http://localhost:3000/repair';

  constructor(private readonly http: HttpClient) {}

  createRepair(createRepairDto: CreateRepairDto): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}`, createRepairDto);
  }

  getAllRepairs(): Observable<Repair[]> {
    return this.http.get<Repair[]>(`${this.apiUrl}`);
  }

  getRepairById(id: string): Observable<Repair> {
    return this.http.get<Repair>(`${this.apiUrl}/${id}`);
  }

  getRepairsByBreakdownId(breakdownId: string): Observable<Repair[]> {
    return this.http.get<Repair[]>(`${this.apiUrl}/breakdown/${breakdownId}`);
  }

  deleteRepair(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  checkHighCostRepair(repairId: string, threshold: number): Observable<boolean> {
    return this.http.post<boolean>(`${this.apiUrl}/${repairId}/high-cost/${threshold}`, null);
  }

  checkRepairWarrantyCoverage(repairId: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/${repairId}/warranty`);
  }

  updateRepairActions(repairId: string, newActions: CommonRepairActionEnum[]): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${repairId}/actions`, newActions);
  }
}
