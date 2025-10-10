import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Concession } from '../../shared/models/concession.model';

@Injectable({
  providedIn: 'root',
})
export class ConcessionService {
  private readonly apiUrl = 'http://localhost:3000/concessions';

  constructor(private readonly http: HttpClient) {}

  createConcession(concessionData: Concession): Observable<Concession> {
    return this.http.post<Concession>(`${this.apiUrl}`, concessionData);
  }

  getAllConcessions(): Observable<Concession[]> {
    return this.http.get<Concession[]>(`${this.apiUrl}`);
  }

  getConcessionById(id: string): Observable<Concession> {
    return this.http.get<Concession>(`${this.apiUrl}/${id}`);
  }

  updateConcessionName(id: string, name: string): Observable<Concession> {
    return this.http.put<Concession>(`${this.apiUrl}/${id}`, { name });
  }

  addMotorcycleToConcession(id: string, motorcycleId: string): Observable<Concession> {
    return this.http.post<Concession>(`${this.apiUrl}/${id}/motorcycle`, { motorcycleId });
  }

  removeMotorcycleFromConcession(concessionId: string, motorcycleId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${concessionId}/motorcycle/${motorcycleId}`);
  }

  assignConcessionToCompany(id: string, companyId: string): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/${id}/assign`, { companyId });
  }

  deleteConcession(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
