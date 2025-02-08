import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MotorcycleService {
  private readonly apiUrl = 'http://localhost:3000/motorcycles';

  constructor(private readonly  http: HttpClient) {}

  getAllMotorcycles(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
