import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { WarrantyService } from '../services/warranty.service';
import { CreateWarrantyDto } from '../tdo/create-warranty.tdo';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-warranty-create',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  templateUrl: './warranty-create.component.html',
})
export class WarrantyCreateComponent implements OnInit {
  warranty: CreateWarrantyDto = {
    motorcycleId: '',
    warrantyType: '',
    description: '',
    startDate: new Date(),
    endDate: new Date()
  };

  constructor(
    private readonly warrantyService: WarrantyService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {}

  createWarranty(): void {
    this.warrantyService.createWarranty(this.warranty).subscribe(
      (newWarranty) => {
        this.router.navigate(['/warranties']);
      },
      (error) => {
        console.error('Error creating warranty:', error);
      }
    );
  }
}
