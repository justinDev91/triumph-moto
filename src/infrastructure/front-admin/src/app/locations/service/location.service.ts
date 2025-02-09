import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Location } from '../../shared/models/location.model';


@Injectable({
  providedIn: 'root',
})
export class LocationService {
  private readonly apiUrl = 'http://localhost:3000/locations';

  constructor(private readonly http: HttpClient) {}

  createLocation(locationData: Partial<Location>): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}`, locationData);
  }

  getLocationById(id: string): Observable<Location> {
    return this.http.get<Location>(`${this.apiUrl}/${id}`);
  }

  getAllLocations(): Observable<Location[]> {
    return this.http.get<Location[]>(`${this.apiUrl}`);
  }

  findLocationByMotorcycle(motorcycleId: string): Observable<Location[]> {
    return this.http.get<Location[]>(`${this.apiUrl}/motorcycle/${motorcycleId}`);
  }

  findLocationByUser(userId: string): Observable<Location[]> {
    return this.http.get<Location[]>(`${this.apiUrl}/user/${userId}`);
  }

  findLocationsByStatus(status: string): Observable<Location[]> {
    return this.http.get<Location[]>(`${this.apiUrl}/status/${status}`);
  }

  calculateLocationCost(id: string): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/${id}/calculate-cost`);
  }

  endLocation(id: string): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}/end`, {});
  }

  cancelLocation(id: string): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}/cancel`, {});
  }
}
