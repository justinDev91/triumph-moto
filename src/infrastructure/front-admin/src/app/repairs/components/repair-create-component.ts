import { Component, OnInit } from '@angular/core';
import { RepairService } from '../services/repair.service';
import { CommonRepairActionEnum } from '../../shared/models/repair.model';
import { CreateRepairDto } from '../dto/create-repair.dto';
import { Router, RouterModule } from '@angular/router';
import { Breakdown } from '../../shared/models/breakdown.model';
import { BreakdownService } from '../../breakdown/services/breakdown.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-repair-create',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './repair-create-component.html',
})
export class RepairCreateComponent implements OnInit {
  breakdowns: Breakdown[] = [];
  actions = Object.values(CommonRepairActionEnum);
  selectedActions: { [key: string]: boolean } = {};
  repair: CreateRepairDto = {
    breakdownId: '',
    repairDate: '',
    actions: [],
    cost: 0,
  };

  constructor(
    private readonly repairService: RepairService,
    private readonly breakdownService: BreakdownService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.fetchBreakdowns();
  }

  fetchBreakdowns(): void {
    this.breakdownService.getAllBreakdowns().subscribe(
      (data) => {
        this.breakdowns = data;
      },
      (error) => {
        console.error('Error fetching breakdowns', error);
      }
    );
  }

  createRepair(): void {
    this.repair.actions = this.actions.filter((action) => this.selectedActions[action]);

    this.repairService.createRepair(this.repair).subscribe(
      () => {
        this.router.navigate(['/repairs']);
      },
      (error) => {
        console.error('Error creating repair:', error);
      }
    );
  }
}
