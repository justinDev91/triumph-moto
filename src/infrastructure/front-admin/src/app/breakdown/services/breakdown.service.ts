import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Breakdown } from '../../shared/models/breakdown.model';
import { Repair } from '../../shared/models/repair.model';

@Injectable({
  providedIn: 'root',
})
export class BreakdownService {
  private readonly apiUrl = 'http://localhost:3000/breakdowns';

  constructor(private readonly http: HttpClient) {}

  getAllBreakdowns(): Observable<Breakdown[]> {
    return this.http.get<Breakdown[]>(`${this.apiUrl}`);
  }

  getBreakdownById(id: string): Observable<Breakdown> {
    return this.http.get<Breakdown>(`${this.apiUrl}/${id}`);
  }

  getBreakdownsByMotorcycleId(motorcycleId: string): Observable<Breakdown[]> {
    return this.http.get<Breakdown[]>(`${this.apiUrl}/motorcycle/${motorcycleId}`);
  }

  createBreakdown(createBreakdownDto: any): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}`, createBreakdownDto);
  }

  updateBreakdownDescription(id: string, description: string): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}/description`, { description });
  }

  addRepairToBreakdown(breakdownId: string, repairId: string): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/${breakdownId}/repair/${repairId}`, null);
  }

  removeRepairFromBreakdown(breakdownId: string, repairId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${breakdownId}/repair/${repairId}`);
  }

  checkWarrantyCoverage(breakdownId: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/${breakdownId}/warranty`);
  }

  getRepairHistory(breakdownId: string): Observable<Repair[]> {
    return this.http.get<Repair[]>(`${this.apiUrl}/${breakdownId}/repair-history`);
  }
}
