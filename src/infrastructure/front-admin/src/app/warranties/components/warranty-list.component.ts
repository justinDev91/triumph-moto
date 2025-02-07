import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { WarrantyService } from '../services/warranty.service';
import { Warranty } from '../../shared/models/warranty.model';

@Component({
  selector: 'app-warranty-list',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    FormsModule,
    RouterModule
  ],
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

  constructor(
    private readonly warrantyService: WarrantyService,
    private readonly cdRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.fetchWarranties();
  }

  fetchWarranties(): void {
    this.warrantyService.getAllWarranties().subscribe((warranties: Warranty[]) => {
      if (this.filterStatus) {
        warranties = this.filterWarrantiesByStatus(warranties, this.filterStatus);
      }

      this.totalWarranties = warranties.length;
      this.totalPages = Math.ceil(this.totalWarranties / this.warrantiesPerPage);
      const startIndex = (this.currentPage - 1) * this.warrantiesPerPage;
      const endIndex = startIndex + this.warrantiesPerPage;
      this.warranties = warranties.slice(startIndex, endIndex);
      this.filteredWarranties = warranties;
      this.cdRef.detectChanges();
    });
  }

  // searchWarranties(query: string): void {
  //   this.warrantyService.searchWarranties(query).subscribe((warranties: Warranty[]) => {
  //     this.filteredWarranties = warranties;
  //     this.totalWarranties = warranties.length;
  //     this.totalPages = Math.ceil(this.totalWarranties / this.warrantiesPerPage);
  //     this.currentPage = 1;
  //     this.warranties = warranties.slice(0, this.warrantiesPerPage);
  //     this.cdRef.detectChanges();

  //     if (this.filteredWarranties.length === 0) {
  //       this.fetchWarranties();
  //     }
  //   });
  // }

  filterWarrantiesByStatus(warranties: Warranty[], status: string): Warranty[] {
    return warranties.filter(warranty => {
      if (status === 'active') {
        return new Date(warranty.endDate) > new Date();
      } else if (status === 'inactive') {
        return new Date(warranty.endDate) <= new Date();
      }
      return true;
    });
  }

  updateWarranty(warranty: Warranty): void {
    console.log('Redirecting to update warranty page...');
  }

  deleteWarranty(warranty: Warranty): void {
    this.warrantyService.deleteWarranty(warranty.id).subscribe(() => {
      this.warranties = this.warranties.filter(w => w.id !== warranty.id);
    });
  }

  addWarranty(): void {
    console.log('Redirecting to add warranty page...');
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
    console.log('onChange', this.filterStatus);
    this.fetchWarranties();
  }
}
