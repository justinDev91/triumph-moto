import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { SparePart } from '../../shared/models/spare-part.model';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SparePartService } from '../services/spare.part.service';

@Component({
  selector: 'app-spare-part-list',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    FormsModule,
    RouterModule
  ],
  templateUrl: './spare.part.list.component.html',
})
export class SparePartListComponent implements OnInit {
  spareParts: SparePart[] = [];
  filteredSpareParts: SparePart[] = [];
  currentPage: number = 1;
  sparePartsPerPage: number = 10;
  totalSpareParts: number = 0;
  totalPages: number = 1;
  filterStatus: string = '';
  searchQuery: string = '';

  constructor(
    private readonly sparePartService: SparePartService,
    private readonly cdRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.fetchSpareParts();
  }

  fetchSpareParts(): void {
    this.sparePartService.getAllSpareParts().subscribe((spareParts: SparePart[]) => {
      if (this.filterStatus) {
        spareParts = this.filterSparePartsByStatus(spareParts, this.filterStatus);
      }

      if (this.searchQuery) {
        spareParts = this.searchSparePartsLocal(spareParts, this.searchQuery);
      }

      this.totalSpareParts = spareParts.length;
      this.totalPages = Math.ceil(this.totalSpareParts / this.sparePartsPerPage);
      const startIndex = (this.currentPage - 1) * this.sparePartsPerPage;
      const endIndex = startIndex + this.sparePartsPerPage;
      this.spareParts = spareParts.slice(startIndex, endIndex);
      this.filteredSpareParts = spareParts;
      this.cdRef.markForCheck();
    });
  }

  searchSpareParts(query: string): void {
    this.searchQuery = query.trim();

    if (this.searchQuery) {
      this.sparePartService.searchSpareParts(this.searchQuery).subscribe((spareParts: SparePart[]) => {
        this.filteredSpareParts = spareParts;
        this.totalSpareParts = spareParts.length;
        this.totalPages = Math.ceil(this.totalSpareParts / this.sparePartsPerPage);
        this.currentPage = 1;
        this.spareParts = spareParts.slice(0, this.sparePartsPerPage);
        this.cdRef.markForCheck();
      });
    } else {
      this.fetchSpareParts();
    }
  }

  searchSparePartsLocal(spareParts: SparePart[], query: string): SparePart[] {
    return spareParts.filter(sparePart =>
      sparePart.name.value.toLowerCase().includes(query.toLowerCase())
    );
  }

  filterSparePartsByStatus(spareParts: SparePart[], status: string): SparePart[] {
    return spareParts.filter(sparePart => {
      if (status === 'low') {
        return sparePart.quantityInStock.value <= sparePart.criticalLevel.value;
      } else if (status === 'available') {
        return sparePart.quantityInStock.value > sparePart.criticalLevel.value;
      }
      return true;
    });
  }

  addSparePart(): void {
  }

  goToNextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.fetchSpareParts();
    }
  }

  goToPreviousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.fetchSpareParts();
    }
  }

  onChange(): void {
    this.fetchSpareParts();
  }
}
