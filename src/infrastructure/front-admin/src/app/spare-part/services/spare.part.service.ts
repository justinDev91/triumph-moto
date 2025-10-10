import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { SparePart } from '../../shared/models/spare-part.model';
import { CreateSparePartDto } from '../tdo/create-spare-part.dto';

@Injectable({
  providedIn: 'root'
})
export class SparePartService {
  private readonly apiUrl = 'http://localhost:3000/spare-parts';

  constructor(private readonly http: HttpClient) {}

  createSparePart(sparePart: CreateSparePartDto): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}`, sparePart).pipe(
      catchError(this.handleError)
    );
  }

  getSparePartById(id: string): Observable<SparePart> {
    return this.http.get<SparePart>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  getAllSpareParts(): Observable<SparePart[]> {
    return this.http.get<SparePart[]>(`${this.apiUrl}`).pipe(
      catchError(this.handleError)
    );
  }

  reserveSparePart(id: string, quantity: number): Observable<boolean | Error> {
    return this.http.patch<boolean>(`${this.apiUrl}/${id}/reserve`, { quantity }).pipe(
      catchError(this.handleError)
    );
  }

  restockSparePart(id: string, quantity: number): Observable<void | Error> {
    return this.http.patch<void>(`${this.apiUrl}/${id}/restock`, { quantity }).pipe(
      catchError(this.handleError)
    );
  }

  useSparePart(id: string, quantity: number): Observable<boolean | Error> {
    return this.http.patch<boolean>(`${this.apiUrl}/${id}/use`, { quantity }).pipe(
      catchError(this.handleError)
    );
  }

  removeSparePart(id: string): Observable<void | Error> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    throw error;
  }

  searchSpareParts(query: string): Observable<SparePart[]> {
    return this.http.get<SparePart[]>(`${this.apiUrl}/search?query=${query}`).pipe(
      catchError(this.handleError)
    );
  }
}
