import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { RepairService } from '../services/repair.service';
import { CommonRepairActionEnum, Repair } from '../../shared/models/repair.model';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-repair-list',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule, RouterModule],
  templateUrl: './repair-list.component.html',
})
export class RepairListComponent implements OnInit {
  repairs: Repair[] = [];
  filteredRepairs: Repair[] = [];
  currentPage: number = 1;
  repairsPerPage: number = 10;
  totalRepairs: number = 0;
  totalPages: number = 1;
  filterActions: CommonRepairActionEnum = CommonRepairActionEnum.OilChange;
  searchQuery: string = '';
  uniqueActions: CommonRepairActionEnum[] = [];
  private readonly searchSubject: Subject<string> = new Subject<string>();

  constructor(
    private readonly repairService: RepairService,
    private readonly cdRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.fetchRepairs();
  }

  fetchRepairs(): void {
    this.repairService.getAllRepairs().subscribe((repairs: Repair[]) => {
      if (Array.isArray(repairs)) {
        this.totalRepairs = repairs.length;
        this.totalPages = Math.ceil(this.totalRepairs / this.repairsPerPage);
        const startIndex = (this.currentPage - 1) * this.repairsPerPage;
        const endIndex = startIndex + this.repairsPerPage;

        this.repairs = repairs.slice(startIndex, endIndex);

        this.filteredRepairs = this.filterRepairsByActions(this.repairs);

        this.extractUniqueActions();

        this.cdRef.detectChanges();
      } else {
        this.repairs = [];
        this.filteredRepairs = [];
        this.totalRepairs = 0;
        this.totalPages = 1;
      }
    }, error => {
      this.repairs = [];
      this.filteredRepairs = [];
      this.totalRepairs = 0;
      this.totalPages = 1;
    });
  }

  extractUniqueActions(): void {
    const actionsSet = new Set<CommonRepairActionEnum>();
    this.repairs.forEach(repair => repair.actions.forEach(action => actionsSet.add(action)));
    this.uniqueActions = Array.from(actionsSet);
  }

  filterRepairsByActions(repairs: Repair[]): Repair[] {
    if (!this.filterActions || this.filterActions === CommonRepairActionEnum.OilChange) {
      return repairs;
    }

    return repairs.filter(repair => repair.actions.includes(this.filterActions));
  }

  deleteRepair(repair: Repair): void {
    this.repairService.deleteRepair(repair.id).subscribe(() => {
      this.repairs = this.repairs.filter(r => r.id !== repair.id);
      this.filteredRepairs = this.filterRepairsByActions(this.repairs);
    });
  }

  updateRepair(repair: Repair): void {
    const newActions: CommonRepairActionEnum[] = [CommonRepairActionEnum.BrakeReplacement, CommonRepairActionEnum.BatteryReplacement];
    this.repairService.updateRepairActions(repair.id, newActions).subscribe(() => {
      this.fetchRepairs();
    });
  }

  goToNextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.fetchRepairs();
    }
  }

  goToPreviousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.fetchRepairs();
    }
  }

  onChange(): void {
    // Fetch repairs after selecting filter.
    this.fetchRepairs();
  }

  onSearchChange(query: string): void {
    this.searchSubject.next(query);
  }
}
