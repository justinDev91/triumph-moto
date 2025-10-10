import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { DriverService } from '../service/driver.service';
import { Driver } from '../../shared/models/driver.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-driver-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './driver.list.component.html',
})
export class DriverListComponent implements OnInit {
  drivers: Driver[] = [];
  filteredDrivers: Driver[] = [];
  currentPage: number = 1;
  driversPerPage: number = 10;
  totalDrivers: number = 0;
  totalPages: number = 1;
  searchQuery: string = '';
  private readonly searchSubject: Subject<string> = new Subject<string>();

  constructor(
    private readonly driverService: DriverService,
    private readonly cdRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.fetchDrivers();

    this.searchSubject
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe(query => this.searchDrivers(query));
  }

  fetchDrivers(): void {
    this.driverService.getAllDrivers().subscribe((drivers: Driver[]) => {
      if (Array.isArray(drivers)) {
        this.totalDrivers = drivers.length;
        this.totalPages = Math.ceil(this.totalDrivers / this.driversPerPage);
        const startIndex = (this.currentPage - 1) * this.driversPerPage;
        const endIndex = startIndex + this.driversPerPage;

        this.drivers = drivers.slice(startIndex, endIndex);
        this.filteredDrivers = this.drivers;
        this.cdRef.detectChanges();
      } else {
        this.resetDrivers();
      }
    }, () => this.resetDrivers());
  }

  searchDrivers(query: string): void {
    if (query.trim()) {
      this.driverService.getAllDrivers().subscribe((drivers: Driver[]) => {
        const filtered = drivers.filter(driver =>
          driver.name.value.toLowerCase().includes(query.toLowerCase())
        );
        this.filteredDrivers = filtered;
        this.totalDrivers = filtered.length;
        this.totalPages = Math.ceil(this.totalDrivers / this.driversPerPage);
        this.currentPage = 1;
        this.drivers = filtered.slice(0, this.driversPerPage);
        this.cdRef.detectChanges();
      }, () => this.resetDrivers());
    } else {
      this.fetchDrivers();
    }
  }

  goToNextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.fetchDrivers();
    }
  }

  goToPreviousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.fetchDrivers();
    }
  }

  onSearchChange(query: string): void {
    this.searchSubject.next(query);
  }

  deleteDriver(id: string): void {
    this.driverService.deleteDriver(id).subscribe(() => {
      this.drivers = this.drivers.filter(d => d.id !== id);
      this.filteredDrivers = this.drivers;
    });
  }

  private resetDrivers(): void {
    this.drivers = [];
    this.filteredDrivers = [];
    this.totalDrivers = 0;
    this.totalPages = 1;
  }
}
