import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Warranty } from '../../shared/models/warranty.model';
import { CreateWarrantyDto } from '../tdo/create-warranty.tdo';
import { UpdateWarrantyDto } from '../tdo/update-warranty.dto';

@Injectable({
  providedIn: 'root'
})
export class WarrantyService {
  private readonly apiUrl = 'http://localhost:3000/warranties';

  constructor(private readonly http: HttpClient) {}

  createWarranty(createWarrantyDto: CreateWarrantyDto): Observable<Warranty> {
    return this.http.post<Warranty>(this.apiUrl, createWarrantyDto);
  }

  getAllWarranties(): Observable<Warranty[]> {
    return this.http.get<Warranty[]>(this.apiUrl);
  }

  getWarrantyById(id: string): Observable<Warranty> {
    return this.http.get<Warranty>(`${this.apiUrl}/${id}`);
  }

  getWarrantyByMotorcycleId(motorcycleId: string): Observable<Warranty> {
    return this.http.get<Warranty>(`${this.apiUrl}/motorcycle/${motorcycleId}`);
  }

  getWarrantyDetails(id: string): Observable<object> {
    return this.http.get<object>(`${this.apiUrl}/${id}/details`);
  }

  updateWarranty(id: string, updateWarrantyDto: UpdateWarrantyDto): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, updateWarrantyDto);
  }

  deleteWarranty(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  searchWarrantiesByMotorcycleBrand(query: string): Observable<Warranty[]> {
    return this.http.get<Warranty[]>(`${this.apiUrl}/search?query=${query}`);

  }
}
