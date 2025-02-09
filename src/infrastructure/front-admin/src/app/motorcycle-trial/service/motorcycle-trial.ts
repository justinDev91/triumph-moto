import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MotorcycleTrial } from '../../shared/models/motorcycle-trial.model';

@Injectable({
  providedIn: 'root',
})
export class MotorcycleTrialService {
  private readonly apiUrl = 'http://localhost:3000/motorcycle-trials';

  constructor(private readonly http: HttpClient) {}


  getAll(): Observable<MotorcycleTrial[]> {
    return this.http.get<MotorcycleTrial[]>(`${this.apiUrl}`);
  }

  getById(id: string): Observable<MotorcycleTrial> {
    return this.http.get<MotorcycleTrial>(`${this.apiUrl}/${id}`);
  }

  getSummary(id: string): Observable<string> {
    return this.http.get<string>(`${this.apiUrl}/${id}/summary`);
  }

  checkStatus(id: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/${id}/status`);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  endTrial(id: string): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}/end`, {});
  }
}
