import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Motorcycle, MotorStatus } from '../../shared/models/motorcycle.model';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { MotorcycleService } from '../service/motorcycle.service';

@Component({
  selector: 'app-motorcycle-list',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule, RouterModule],
  templateUrl: './motorcycle-list.component.html',
})
export class MotorcycleListComponent implements OnInit {
  motorcycles: Motorcycle[] = [];
  filteredMotorcycles: Motorcycle[] = [];
  currentPage: number = 1;
  motorcyclesPerPage: number = 10;
  totalMotorcycles: number = 0;
  totalPages: number = 1;
  filterStatus: MotorStatus = '' as MotorStatus;
  searchQuery: string = '';
  private readonly searchSubject: Subject<string> = new Subject<string>();

  constructor(
    private readonly motorcycleService: MotorcycleService,
    private readonly cdRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.fetchMotorcycles();
    this.searchSubject
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe(query => this.searchMotorcycles(query));
  }

  fetchMotorcycles(): void {
    this.motorcycleService.getAllMotorcycles().subscribe((motorcycles: Motorcycle[]) => {

      if (Array.isArray(motorcycles)) {
        this.totalMotorcycles = motorcycles.length;
        this.totalPages = Math.ceil(this.totalMotorcycles / this.motorcyclesPerPage);
        const startIndex = (this.currentPage - 1) * this.motorcyclesPerPage;
        const endIndex = startIndex + this.motorcyclesPerPage;

        this.motorcycles = this.filterMotorcyclesByStatus(motorcycles.slice(startIndex, endIndex), this.filterStatus);
        this.filteredMotorcycles = this.motorcycles;
        this.cdRef.detectChanges();

      } else {
        this.motorcycles = [];
        this.filteredMotorcycles = [];
        this.totalMotorcycles = 0;
        this.totalPages = 1;
      }
    }, error => {
      this.motorcycles = [];
      this.filteredMotorcycles = [];
      this.totalMotorcycles = 0;
      this.totalPages = 1;
    });
  }

  searchMotorcycles(query: string): void {
    if (query.trim()) {
      this.motorcycleService.getAllMotorcycles().subscribe((motorcycles: Motorcycle[]) => {
        if (Array.isArray(motorcycles)) {
          this.filteredMotorcycles = motorcycles.filter(m =>
            m.brand.value.toLowerCase().includes(query.toLowerCase())
          );
          this.totalMotorcycles = this.filteredMotorcycles.length;
          this.totalPages = Math.ceil(this.totalMotorcycles / this.motorcyclesPerPage);
          this.currentPage = 1;
          this.motorcycles = this.filteredMotorcycles.slice(0, this.motorcyclesPerPage);
          this.cdRef.detectChanges();
        } else {
          this.resetMotorcycles();
        }
      }, () => this.resetMotorcycles());
    } else {
      this.fetchMotorcycles();
    }
  }

  filterMotorcyclesByStatus(motorcycles: Motorcycle[], status: MotorStatus): Motorcycle[] {
    if (!status) {
      return motorcycles;
    }
    return motorcycles.filter(m => m.status === status);
  }

  deleteMotorcycle(motorcycle: Motorcycle): void {
    this.motorcycleService.deleteMotorcycle(motorcycle.id).subscribe(() => {
      this.motorcycles = this.motorcycles.filter(m => m.id !== motorcycle.id);
      this.filteredMotorcycles = this.filterMotorcyclesByStatus(this.motorcycles, this.filterStatus);
    });
  }

  goToNextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.fetchMotorcycles();
    }
  }

  goToPreviousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.fetchMotorcycles();
    }
  }

  onChange(): void {
    this.fetchMotorcycles();
  }

  onSearchChange(query: string): void {
    this.searchSubject.next(query);
  }

  private resetMotorcycles(): void {
    this.motorcycles = [];
    this.filteredMotorcycles = [];
    this.totalMotorcycles = 0;
    this.totalPages = 1;
  }
}
