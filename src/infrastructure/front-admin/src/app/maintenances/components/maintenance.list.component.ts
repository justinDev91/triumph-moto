import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Maintenance } from '../../shared/models/maintenance.model';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { MaintenanceService } from '../service/maintenance.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-maintenance-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './maintenance.list.component.html'
})
export class MaintenanceListComponent implements OnInit {
  maintenances: Maintenance[] = [];
  filteredMaintenances: Maintenance[] = [];
  currentPage: number = 1;
  maintenancesPerPage: number = 10;
  totalMaintenances: number = 0;
  totalPages: number = 1;
  filterStatus: string = '';
  searchQuery: string = '';
  private readonly searchSubject: Subject<string> = new Subject<string>();

  constructor(
    private readonly maintenanceService: MaintenanceService,
    private readonly cdRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.fetchMaintenances();

    this.searchSubject
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe(query => this.searchMaintenances(query));
  }

  fetchMaintenances(): void {
    this.maintenanceService.getAllMaintenanceRecords().subscribe((maintenances: Maintenance[]) => {
      if (Array.isArray(maintenances)) {
        console.log('Fetched Maintenances:', maintenances);

        this.totalMaintenances = maintenances.length;
        this.totalPages = Math.ceil(this.totalMaintenances / this.maintenancesPerPage);
        const startIndex = (this.currentPage - 1) * this.maintenancesPerPage;
        const endIndex = startIndex + this.maintenancesPerPage;

        this.maintenances = maintenances.slice(startIndex, endIndex);
        this.filteredMaintenances = this.maintenances;
        this.cdRef.detectChanges();
      } else {
        console.error('Error fetching maintenances:');

        this.maintenances = [];
        this.filteredMaintenances = [];
        this.totalMaintenances = 0;
        this.totalPages = 1;
      }
    }, error => {
      this.maintenances = [];
      this.filteredMaintenances = [];
      this.totalMaintenances = 0;
      this.totalPages = 1;
    });
  }

  searchMaintenances(query: string): void {
    if (query.trim()) {
      this.maintenanceService.findMaintenanceByMotorcycleId(query).subscribe((maintenances: Maintenance[]) => {
        this.filteredMaintenances = maintenances;
        this.totalMaintenances = maintenances.length;
        this.totalPages = Math.ceil(this.totalMaintenances / this.maintenancesPerPage);
        this.currentPage = 1;
        this.maintenances = maintenances.slice(0, this.maintenancesPerPage);
        this.cdRef.detectChanges();
      }, error => {
        this.maintenances = [];
        this.filteredMaintenances = [];
        this.totalMaintenances = 0;
        this.totalPages = 1;
      });
    } else {
      this.fetchMaintenances();
    }
  }

  goToNextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.fetchMaintenances();
    }
  }

  goToPreviousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.fetchMaintenances();
    }
  }

  onSearchChange(query: string): void {
    this.searchSubject.next(query);
  }

  deleteMaintenance(id: string): void {
    this.maintenanceService.deleteMaintenance(id).subscribe(() => {
      this.maintenances = this.maintenances.filter(m => m.id !== id);
      this.filteredMaintenances = this.maintenances;
    });
  }
}
