import { Component, OnInit } from '@angular/core';
import { WarrantyService } from '../services/warranty.service';
import { CreateWarrantyDto } from '../tdo/create-warranty.tdo';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router} from '@angular/router';
import { Motorcycle } from '../../shared/models/motorcycle.model';
import { MotorcycleService } from '../../motorcycles/motorcycle.service';

@Component({
  selector: 'app-warranty-create',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './warranty-create-component.html',
})
export class WarrantyCreateComponent implements OnInit {
  motorcycles: Motorcycle[] = [];
  warranty: CreateWarrantyDto = {
    motorcycleId: '',
    coverageDetails: '',
    isActive: true,
    startDate: new Date(),
    endDate: new Date(),
  };

  constructor(
    private readonly warrantyService: WarrantyService,
    private readonly motorcycleService: MotorcycleService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.fetchMotorcycles();
  }

  fetchMotorcycles(): void {
    this.motorcycleService.getAllMotorcycles().subscribe(
      (data) => {
        this.motorcycles = data;
      },
      (error) => {
        console.error('Error fetching motorcycles', error);
      }
    );
  }

  createWarranty(): void {
    this.warrantyService.createWarranty(this.warranty).subscribe(
      () => {
        this.router.navigate(['/warranties']);
      },
      (error) => {
        console.error('Error creating warranty:', error);
      }
    );
  }
}
