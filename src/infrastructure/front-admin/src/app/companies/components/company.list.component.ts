import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { Company } from '../../shared/models/company.model';
import { CompanyService } from '../service/company.service';

@Component({
  selector: 'app-company-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './company.list.component.html',
})
export class CompanyListComponent implements OnInit {
  companies: Company[] = [];
  filteredCompanies: Company[] = [];
  currentPage: number = 1;
  companiesPerPage: number = 10;
  totalCompanies: number = 0;
  totalPages: number = 1;
  searchQuery: string = '';
  private readonly searchSubject: Subject<string> = new Subject<string>();

  constructor(
    private readonly companyService: CompanyService,
    private readonly cdRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.fetchCompanies();

    this.searchSubject
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe(query => this.searchCompanies(query));
  }

  fetchCompanies(): void {
    this.companyService.getAllCompanies().subscribe((companies: Company[]) => {
      if (Array.isArray(companies)) {
        this.totalCompanies = companies.length;
        this.totalPages = Math.ceil(this.totalCompanies / this.companiesPerPage);
        const startIndex = (this.currentPage - 1) * this.companiesPerPage;
        const endIndex = startIndex + this.companiesPerPage;

        this.companies = companies.slice(startIndex, endIndex);
        this.filteredCompanies = this.companies;
        this.cdRef.detectChanges();
      } else {
        this.companies = [];
        this.filteredCompanies = [];
        this.totalCompanies = 0;
        this.totalPages = 1;
      }
    }, error => {
      console.error("Error fetching companies:", error);
      this.companies = [];
      this.filteredCompanies = [];
      this.totalCompanies = 0;
      this.totalPages = 1;
    });
  }

  searchCompanies(query: string): void {
    if (query.trim()) {
      this.companyService.getAllCompanies().subscribe((companies: Company[]) => {
        if (Array.isArray(companies)) {
          this.filteredCompanies = companies.filter(company =>
            company.name.value.toLowerCase().includes(query.toLowerCase())
          );
          this.totalCompanies = this.filteredCompanies.length;
          this.totalPages = Math.ceil(this.totalCompanies / this.companiesPerPage);
          this.currentPage = 1;
          this.companies = this.filteredCompanies.slice(0, this.companiesPerPage);
          this.cdRef.detectChanges();
        } else {
          this.companies = [];
          this.filteredCompanies = [];
          this.totalCompanies = 0;
          this.totalPages = 1;
        }
      }, error => {
        this.companies = [];
        this.filteredCompanies = [];
        this.totalCompanies = 0;
        this.totalPages = 1;
      });
    } else {
      this.fetchCompanies();
    }
  }

  goToNextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.fetchCompanies();
    }
  }

  goToPreviousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.fetchCompanies();
    }
  }

  onSearchChange(query: string): void {
    this.searchSubject.next(query);
  }


}
