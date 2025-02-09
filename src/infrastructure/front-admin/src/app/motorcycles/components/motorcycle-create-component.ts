import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { CreateMotorcycleDto } from '../tdo/create-motorcycle.tdo';
import { MotorcycleService } from '../service/motorcycle.service';
import { MotorStatus } from '../../shared/models/motorcycle.model';
import { Company } from '../../shared/models/company.model';
import { CompanyService } from '../../companies/service/company.service';

@Component({
  selector: 'app-motorcycle-create',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './motorcycle-create-component.html',
})
export class MotorcycleCreateComponent implements OnInit {
  motorcycle: CreateMotorcycleDto = {
    brand: '',
    model: '',
    year: 0,
    mileage: 0,
    status: '' as MotorStatus,
    purchaseDate: new Date(),
    lastServiceDate: new Date(),
    nextServiceMileage: 0,
    companyId: '',
  };

  statuses: MotorStatus[] = ['Available', 'InMaintenance', 'OnTest', 'Sold'];
  companies: Company[] = [];

  constructor(
    private readonly motorcycleService: MotorcycleService,
    private readonly router: Router,
    private readonly companyService: CompanyService
  ) {}

  ngOnInit(): void {
    this.fetchCompanies();
  }

  fetchCompanies(): void {
    this.companyService.getAllCompanies().subscribe(
      (data) => {
        this.companies = data;
      },
      (error) => {
        console.error('Error fetching companies', error);
      }
    );
  }

  createMotorcycle(): void {
    this.motorcycleService.createMotorcycle(this.motorcycle).subscribe(
      () => {
        this.router.navigate(['/motorcycles']);
      },
      (error) => {
        console.error('Error creating motorcycle:', error);
      }
    );
  }
}
