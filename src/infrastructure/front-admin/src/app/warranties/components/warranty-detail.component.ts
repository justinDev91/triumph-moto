import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { WarrantyService } from '../services/warranty.service';
import { CommonModule } from '@angular/common';
import { Warranty } from '../../shared/models/warranty.model';

@Component({
  selector: 'app-warranty-detail',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet
  ],
  templateUrl: './warranty-detail.component.html',
})
export class WarrantyDetailComponent implements OnInit {
  warrantyId: string | null = null;
  warranty: Warranty | null = null;
  isLoading = true;
  errorMessage: string | null = null;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly warrantyService: WarrantyService
  ) {}

  ngOnInit() {
    this.warrantyId = this.route.snapshot.paramMap.get('id');

    if (this.warrantyId) {
      this.warrantyService.getWarrantyById(this.warrantyId).subscribe({
        next: (data) => {
          this.warranty = data;
          this.isLoading = false;
        },
        error: (error) => {
          this.errorMessage = 'Failed to load warranty details.';
          console.error('Error fetching warranty:', error);
          this.isLoading = false;
        }
      });
    } else {
      this.errorMessage = 'Invalid warranty ID.';
      this.isLoading = false;
    }
  }
}
