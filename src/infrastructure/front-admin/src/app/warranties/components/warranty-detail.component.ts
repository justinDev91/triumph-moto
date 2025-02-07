import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { WarrantyService } from '../services/warranty.service';
import { CommonModule } from '@angular/common';

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
  warrantyId!: string;
  warranty!: {};

  constructor(
    private readonly route: ActivatedRoute,
    private readonly warrantyService: WarrantyService
  ) {}

  ngOnInit() {
    this.warrantyId = this.route.snapshot.paramMap.get('id')!;
    this.warrantyService.getWarrantyById(this.warrantyId).subscribe((data) => {
      this.warranty = data;
    });
  }
}
