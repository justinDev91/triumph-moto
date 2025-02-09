import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { Appointment } from '../../shared/models/appointment.model';
import { AppointmentService } from '../service/appointment.service';

@Component({
  selector: 'app-appointment-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './appointment.list.component.html',
})
export class AppointmentListComponent implements OnInit {
  appointments: Appointment[] = [];
  filteredAppointments: Appointment[] = [];
  currentPage: number = 1;
  appointmentsPerPage: number = 10;
  totalAppointments: number = 0;
  totalPages: number = 1;
  searchQuery: string = '';
  private readonly searchSubject: Subject<string> = new Subject<string>();

  constructor(
    private readonly appointmentService: AppointmentService,
    private readonly cdRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.fetchAppointments();

    this.searchSubject
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe(query => this.searchAppointments(query));
  }

  fetchAppointments(): void {
    this.appointmentService.getAllAppointments().subscribe((appointments: Appointment[]) => {
      if (Array.isArray(appointments)) {
        this.totalAppointments = appointments.length;
        this.totalPages = Math.ceil(this.totalAppointments / this.appointmentsPerPage);
        const startIndex = (this.currentPage - 1) * this.appointmentsPerPage;
        const endIndex = startIndex + this.appointmentsPerPage;

        this.appointments = appointments.slice(startIndex, endIndex);
        this.filteredAppointments = this.appointments;
        this.cdRef.detectChanges();
      } else {
        this.appointments = [];
        this.filteredAppointments = [];
        this.totalAppointments = 0;
        this.totalPages = 1;
      }
    }, error => {
      this.appointments = [];
      this.filteredAppointments = [];
      this.totalAppointments = 0;
      this.totalPages = 1;
    });
  }

  searchAppointments(query: string): void {
    if (query.trim()) {
      this.appointmentService.getAllAppointments().subscribe((appointments: Appointment[]) => {
        if (Array.isArray(appointments)) {
          this.filteredAppointments = appointments.filter(appointment =>
            appointment.user.firstName.value.toLowerCase().includes(query.toLowerCase()) ||
            appointment.user.lastName.value.toLowerCase().includes(query.toLowerCase()) ||
            appointment.reason.toLowerCase().includes(query.toLowerCase())
          );
          this.totalAppointments = this.filteredAppointments.length;
          this.totalPages = Math.ceil(this.totalAppointments / this.appointmentsPerPage);
          this.currentPage = 1;
          this.appointments = this.filteredAppointments.slice(0, this.appointmentsPerPage);
          this.cdRef.detectChanges();
        } else {
          this.appointments = [];
          this.filteredAppointments = [];
          this.totalAppointments = 0;
          this.totalPages = 1;
        }
      }, error => {
        this.appointments = [];
        this.filteredAppointments = [];
        this.totalAppointments = 0;
        this.totalPages = 1;
      });
    } else {
      this.fetchAppointments();
    }
  }

  goToNextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.fetchAppointments();
    }
  }

  goToPreviousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.fetchAppointments();
    }
  }

  deleteAppointment(id: string): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce rendez-vous ?')) {
      this.appointmentService.deleteAppointment(id).subscribe(() => {
        this.fetchAppointments();
      });
    }
  }

  onSearchChange(query: string): void {
    this.searchSubject.next(query);
  }
}
