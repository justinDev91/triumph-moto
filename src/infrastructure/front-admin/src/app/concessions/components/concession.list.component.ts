import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { ConcessionService } from '../service/concession.service';
import { Concession } from '../../shared/models/concession.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-concession-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './concession.list.component.html',
})
export class ConcessionListComponent implements OnInit {
  concessions: Concession[] = [];
  filteredConcessions: Concession[] = [];
  currentPage: number = 1;
  concessionsPerPage: number = 10;
  totalConcessions: number = 0;
  totalPages: number = 1;
  searchQuery: string = '';
  private readonly searchSubject: Subject<string> = new Subject<string>();

  constructor(
    private readonly concessionService: ConcessionService,
    private readonly cdRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.fetchConcessions();

    this.searchSubject
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe(query => this.searchConcessions(query));
  }

  fetchConcessions(): void {
    this.concessionService.getAllConcessions().subscribe((concessions: Concession[]) => {
      if (Array.isArray(concessions)) {
        this.totalConcessions = concessions.length;
        this.totalPages = Math.ceil(this.totalConcessions / this.concessionsPerPage);
        const startIndex = (this.currentPage - 1) * this.concessionsPerPage;
        const endIndex = startIndex + this.concessionsPerPage;

        this.concessions = concessions.slice(startIndex, endIndex);
        this.filteredConcessions = this.concessions;
        this.cdRef.detectChanges();
      } else {
        this.resetConcessions();
      }
    }, () => this.resetConcessions());
  }

  searchConcessions(query: string): void {
    if (query.trim()) {
      this.concessionService.getAllConcessions().subscribe((concessions: Concession[]) => {
        const filtered = concessions.filter(concession =>
          concession.name.value.toLowerCase().includes(query.toLowerCase())
        );
        this.filteredConcessions = filtered;
        this.totalConcessions = filtered.length;
        this.totalPages = Math.ceil(this.totalConcessions / this.concessionsPerPage);
        this.currentPage = 1;
        this.concessions = filtered.slice(0, this.concessionsPerPage);
        this.cdRef.detectChanges();
      }, () => this.resetConcessions());
    } else {
      this.fetchConcessions();
    }
  }

  goToNextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.fetchConcessions();
    }
  }

  goToPreviousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.fetchConcessions();
    }
  }

  onSearchChange(query: string): void {
    this.searchSubject.next(query);
  }

  deleteConcession(id: string): void {
    this.concessionService.deleteConcession(id).subscribe(() => {
      this.concessions = this.concessions.filter(c => c.id !== id);
      this.filteredConcessions = this.concessions;
    });
  }

  private resetConcessions(): void {
    this.concessions = [];
    this.filteredConcessions = [];
    this.totalConcessions = 0;
    this.totalPages = 1;
  }
}
