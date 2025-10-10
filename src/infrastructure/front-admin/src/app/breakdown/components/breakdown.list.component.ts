import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { Breakdown } from '../../shared/models/breakdown.model';
import { BreakdownService } from '../services/breakdown.service';

@Component({
  selector: 'app-breakdown-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './breakdown.list.component.html',
})
export class BreakdownListComponent implements OnInit {
  breakdowns: Breakdown[] = [];
  filteredBreakdowns: Breakdown[] = [];
  currentPage: number = 1;
  breakdownsPerPage: number = 10;
  totalBreakdowns: number = 0;
  totalPages: number = 1;
  searchQuery: string = '';
  private readonly searchSubject: Subject<string> = new Subject<string>();

  constructor(
    private readonly breakdownService: BreakdownService,
    private readonly cdRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.fetchBreakdowns();

    this.searchSubject
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe(query => this.searchBreakdowns(query));
  }

  fetchBreakdowns(): void {
    this.breakdownService.getAllBreakdowns().subscribe((breakdowns: Breakdown[]) => {
      if (Array.isArray(breakdowns)) {
        this.totalBreakdowns = breakdowns.length;
        this.totalPages = Math.ceil(this.totalBreakdowns / this.breakdownsPerPage);
        const startIndex = (this.currentPage - 1) * this.breakdownsPerPage;
        const endIndex = startIndex + this.breakdownsPerPage;

        this.breakdowns = breakdowns.slice(startIndex, endIndex);
        this.filteredBreakdowns = this.breakdowns;
        this.cdRef.detectChanges();
      } else {
        this.breakdowns = [];
        this.filteredBreakdowns = [];
        this.totalBreakdowns = 0;
        this.totalPages = 1;
      }
    }, error => {
      this.breakdowns = [];
      this.filteredBreakdowns = [];
      this.totalBreakdowns = 0;
      this.totalPages = 1;
    });
  }

  searchBreakdowns(query: string): void {
    if (query.trim()) {
      this.breakdownService.getAllBreakdowns().subscribe((breakdowns: Breakdown[]) => {
        if (Array.isArray(breakdowns)) {
          this.filteredBreakdowns = breakdowns.filter(breakdown =>
            breakdown.description.value.toLowerCase().includes(query.toLowerCase())
          );
          this.totalBreakdowns = this.filteredBreakdowns.length;
          this.totalPages = Math.ceil(this.totalBreakdowns / this.breakdownsPerPage);
          this.currentPage = 1;
          this.breakdowns = this.filteredBreakdowns.slice(0, this.breakdownsPerPage);
          this.cdRef.detectChanges();
        } else {
          this.breakdowns = [];
          this.filteredBreakdowns = [];
          this.totalBreakdowns = 0;
          this.totalPages = 1;
        }
      }, error => {
        this.breakdowns = [];
        this.filteredBreakdowns = [];
        this.totalBreakdowns = 0;
        this.totalPages = 1;
      });
    } else {
      this.fetchBreakdowns();
    }
  }

  goToNextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.fetchBreakdowns();
    }
  }

  goToPreviousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.fetchBreakdowns();
    }
  }

  onSearchChange(query: string): void {
    this.searchSubject.next(query);
  }
}
