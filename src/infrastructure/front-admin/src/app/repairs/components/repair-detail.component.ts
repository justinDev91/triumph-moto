import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { RepairService } from '../services/repair.service';
import { Repair } from '../../shared/models/repair.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-repair-detail',
   imports: [
      CommonModule,
      RouterOutlet
    ],
  templateUrl: './repair-detail.component.html',
})
export class RepairDetailComponent implements OnInit {
  repair: Repair | undefined;
  isLoading = false;
  errorMessage: string | undefined;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly repairService: RepairService
  ) {}

  ngOnInit(): void {

    const repairId = this.route.snapshot.paramMap.get('id');


    if (repairId) {
      this.fetchRepairDetails(repairId);
      console.log("repair", this.repair)
    }
  }

  private fetchRepairDetails(repairId: string): void {
    console.log("fetch", this.repair)

    this.isLoading = true;
    this.repairService.getRepairById(repairId).subscribe(
      (repairDetails) => {
        this.repair = repairDetails;
        this.isLoading = false;
      },
      (error) => {
        this.errorMessage = 'Failed to fetch repair details';
        this.isLoading = false;
      }
    );
  }
}
