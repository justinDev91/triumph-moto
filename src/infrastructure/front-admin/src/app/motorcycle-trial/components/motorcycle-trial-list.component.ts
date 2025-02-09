import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { MotorcycleTrial } from '../../shared/models/motorcycle-trial.model';
import { MotorcycleTrialService } from '../service/motorcycle-trial';

@Component({
  selector: 'app-motorcycle-trial-list',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule, RouterModule],
  templateUrl: './motorcycle-trial-list.component.html',
})
export class MotorcycleTrialListComponent implements OnInit {
  trials: MotorcycleTrial[] = [];
  filteredTrials: MotorcycleTrial[] = [];
  currentPage: number = 1;
  trialsPerPage: number = 10;
  totalTrials: number = 0;
  totalPages: number = 1;
  searchQuery: string = '';
  private readonly searchSubject: Subject<string> = new Subject<string>();

  constructor(
    private readonly trialService: MotorcycleTrialService,
    private readonly cdRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.fetchTrials();
    this.searchSubject
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe(query => this.searchTrials(query));
  }

  fetchTrials(): void {
    this.trialService.getAll().subscribe((trials: MotorcycleTrial[]) => {
      if (Array.isArray(trials)) {
        this.totalTrials = trials.length;
        this.totalPages = Math.ceil(this.totalTrials / this.trialsPerPage);
        const startIndex = (this.currentPage - 1) * this.trialsPerPage;
        const endIndex = startIndex + this.trialsPerPage;

        this.trials = trials.slice(startIndex, endIndex);
        this.filteredTrials = this.trials;
        this.cdRef.detectChanges();
      } else {
        this.resetTrials();
      }
    }, () => this.resetTrials());
  }

  searchTrials(query: string): void {
    if (query.trim()) {
      this.trialService.getAll().subscribe((trials: MotorcycleTrial[]) => {
        if (Array.isArray(trials)) {
          this.filteredTrials = trials.filter(t =>
            t.motorcycle.brand.value.toLowerCase().includes(query.toLowerCase()) ||
            t.motorcycle.model.value.toLowerCase().includes(query.toLowerCase())
          );
          this.totalTrials = this.filteredTrials.length;
          this.totalPages = Math.ceil(this.totalTrials / this.trialsPerPage);
          this.currentPage = 1;
          this.trials = this.filteredTrials.slice(0, this.trialsPerPage);
          this.cdRef.detectChanges();
        } else {
          this.resetTrials();
        }
      }, () => this.resetTrials());
    } else {
      this.fetchTrials();
    }
  }

  deleteTrial(trial: MotorcycleTrial): void {
    this.trialService.delete(trial.id).subscribe(() => {
      this.trials = this.trials.filter(t => t.id !== trial.id);
      this.filteredTrials = this.trials;
    });
  }

  goToNextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.fetchTrials();
    }
  }

  goToPreviousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.fetchTrials();
    }
  }

  onSearchChange(query: string): void {
    this.searchSubject.next(query);
  }

  private resetTrials(): void {
    this.trials = [];
    this.filteredTrials = [];
    this.totalTrials = 0;
    this.totalPages = 1;
  }
}
