import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Appointment } from '../../shared/models/appointment.model';

@Injectable({
  providedIn: 'root',
})
export class AppointmentService {
  private readonly apiUrl = 'http://localhost:3000/appointments';

  constructor(private readonly http: HttpClient) {}

  createAppointment(createAppointmentDto: any): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}`, createAppointmentDto);
  }

  getAllAppointments(): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(`${this.apiUrl}`);
  }

  getAppointmentById(id: string): Observable<Appointment> {
    return this.http.get<Appointment>(`${this.apiUrl}/${id}`);
  }

  updateAppointment(id: string, updateAppointmentDto: any): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, updateAppointmentDto);
  }

  cancelAppointment(id: string): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/${id}/cancel`, null);
  }

  completeAppointment(id: string): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/${id}/complete`, null);
  }

  deleteAppointment(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getAppointmentDetails(id: string): Observable<Appointment> {
    return this.http.get<Appointment>(`${this.apiUrl}/${id}`);
  }
}
