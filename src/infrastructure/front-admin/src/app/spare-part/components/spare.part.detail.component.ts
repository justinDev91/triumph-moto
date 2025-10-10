import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { SparePartService } from '../services/spare.part.service';
import { SparePart } from '../../shared/models/spare-part.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-spare-part-detail',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet
  ],
  templateUrl: './spare.part.detail.component.html',
})
export class SparePartDetailComponent implements OnInit {
  sparePartId!: string;
  sparePart!: SparePart;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly sparePartService: SparePartService
  ) {}

  ngOnInit() {
    this.sparePartId = this.route.snapshot.paramMap.get('id')!;
    this.sparePartService.getSparePartById(this.sparePartId).subscribe((data) => {
      this.sparePart = data;
    });
  }
}
