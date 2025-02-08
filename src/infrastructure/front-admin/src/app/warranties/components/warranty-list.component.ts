import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { WarrantyService } from '../services/warranty.service';
import { Warranty } from '../../shared/models/warranty.model';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';

@Component({
  selector: 'app-warranty-list',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule, RouterModule],
  templateUrl: './warranty-list.component.html',
})
export class WarrantyListComponent implements OnInit {
  warranties: Warranty[] = [];
  filteredWarranties: Warranty[] = [];
  currentPage: number = 1;
  warrantiesPerPage: number = 10;
  totalWarranties: number = 0;
  totalPages: number = 1;
  filterStatus: string = '';
  searchQuery: string = '';
  private readonly searchSubject: Subject<string> = new Subject<string>();

  constructor(
    private readonly warrantyService: WarrantyService,
    private readonly cdRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.fetchWarranties();

    this.searchSubject
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe(query => this.searchWarranties(query));
  }

  fetchWarranties(): void {
    this.warrantyService.getAllWarranties().subscribe((warranties: Warranty[]) => {
      if (Array.isArray(warranties)) {
        warranties.forEach(warranty => {
          warranty.isActive = new Date(warranty.endDate.value) > new Date();
        });

        this.totalWarranties = warranties.length;
        this.totalPages = Math.ceil(this.totalWarranties / this.warrantiesPerPage);
        const startIndex = (this.currentPage - 1) * this.warrantiesPerPage;
        const endIndex = startIndex + this.warrantiesPerPage;

        this.warranties = this.filterWarrantiesByStatus(warranties.slice(startIndex, endIndex), this.filterStatus);
        this.filteredWarranties = this.warranties;
        this.cdRef.detectChanges();
      } else {
        console.error("API response is not an array:", warranties);
        this.warranties = [];
        this.filteredWarranties = [];
        this.totalWarranties = 0;
        this.totalPages = 1;
      }
    }, error => {
      console.error("Error fetching warranties:", error);
      this.warranties = [];
      this.filteredWarranties = [];
      this.totalWarranties = 0;
      this.totalPages = 1;
    });
  }

  searchWarranties(query: string): void {
    if (query.trim()) {
      this.warrantyService.searchWarrantiesByMotorcycleBrand(query).subscribe((warranties: Warranty[]) => {
        if (Array.isArray(warranties)) {
          this.filteredWarranties = warranties;
          this.totalWarranties = warranties.length;
          this.totalPages = Math.ceil(this.totalWarranties / this.warrantiesPerPage);
          this.currentPage = 1;
          this.warranties = warranties.slice(0, this.warrantiesPerPage);
          this.cdRef.detectChanges();
          console.log("warranties", warranties);
        } else {
          console.error("API response is not an array:", warranties);
          this.warranties = [];
          this.filteredWarranties = [];
          this.totalWarranties = 0;
          this.totalPages = 1;
        }
      }, error => {
        console.error("Error searching warranties:", error);
        this.warranties = [];
        this.filteredWarranties = [];
        this.totalWarranties = 0;
        this.totalPages = 1;
      });
    } else {
      this.fetchWarranties();
    }
  }

  filterWarrantiesByStatus(warranties: Warranty[], status: string): Warranty[] {
    if (status === 'active') {
      return warranties.filter(warranty => warranty.isActive);
    } else if (status === 'inactive') {
      return warranties.filter(warranty => !warranty.isActive);
    }
    return warranties;
  }

  toggleWarrantyStatus(warranty: Warranty): void {
    warranty.isActive = !warranty.isActive;
    this.filteredWarranties = this.filterWarrantiesByStatus(this.warranties, this.filterStatus);
    this.cdRef.detectChanges();
  }

  deleteWarranty(warranty: Warranty): void {
    this.warrantyService.deleteWarranty(warranty.id).subscribe(() => {
      this.warranties = this.warranties.filter(w => w.id !== warranty.id);
      this.filteredWarranties = this.filterWarrantiesByStatus(this.warranties, this.filterStatus);
    });
  }

  goToNextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.fetchWarranties();
    }
  }

  goToPreviousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.fetchWarranties();
    }
  }

  onChange(): void {
    this.fetchWarranties();
  }

  onSearchChange(query: string): void {
    this.searchSubject.next(query);
  }
}
