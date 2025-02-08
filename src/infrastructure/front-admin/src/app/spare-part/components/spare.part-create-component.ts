import { Component, OnInit } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { SparePartService } from '../services/spare.part.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CreateSparePartDto } from '../tdo/create-spare-part.dto';

@Component({
  selector: 'app-spare-part-create',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  templateUrl: './spare.part-create-component.html',
})
export class SparePartCreateComponent  {
  sparePart: CreateSparePartDto = {
    name: '',
    quantityInStock: 0,
    criticalLevel: 0,
    cost: 0
  };

  constructor(
    private readonly sparePartService: SparePartService,
    private readonly router: Router
  ) {}

  createSparePart(): void {
    this.sparePartService.createSparePart(this.sparePart).subscribe(
      (newSparePart) => {
        this.router.navigate(['/spareparts']);
      },
      (error) => {
        console.error('Error creating spare part:', error);
      }
    );
  }
}
