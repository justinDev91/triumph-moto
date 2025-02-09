import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Location } from '../../shared/models/location.model';
import { LocationService } from '../service/location.service';

@Component({
  selector: 'app-location-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './location.list.component.html'
})
export class LocationListComponent implements OnInit {
  locations: Location[] = [];
  filteredLocations: Location[] = [];
  currentPage: number = 1;
  locationsPerPage: number = 10;
  totalLocations: number = 0;
  totalPages: number = 1;
  searchQuery: string = '';
  private readonly searchSubject: Subject<string> = new Subject<string>();

  constructor(
    private readonly locationService: LocationService,
    private readonly cdRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.fetchLocations();

    this.searchSubject
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe(query => this.searchLocations(query));
  }

  fetchLocations(): void {
    this.locationService.getAllLocations().subscribe((locations: Location[]) => {
      if (Array.isArray(locations)) {
        this.totalLocations = locations.length;
        this.totalPages = Math.ceil(this.totalLocations / this.locationsPerPage);
        const startIndex = (this.currentPage - 1) * this.locationsPerPage;
        const endIndex = startIndex + this.locationsPerPage;

        this.locations = locations.slice(startIndex, endIndex);
        this.filteredLocations = this.locations;
        this.cdRef.detectChanges();
      } else {
        this.resetLocations();
      }
    }, () => this.resetLocations());
  }

  searchLocations(query: string): void {
    if (query.trim()) {
      this.locationService.findLocationByMotorcycle(query).subscribe((locations: Location[]) => {
        this.filteredLocations = locations;
        this.totalLocations = locations.length;
        this.totalPages = Math.ceil(this.totalLocations / this.locationsPerPage);
        this.currentPage = 1;
        this.locations = locations.slice(0, this.locationsPerPage);
        this.cdRef.detectChanges();
      }, () => this.resetLocations());
    } else {
      this.fetchLocations();
    }
  }

  goToNextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.fetchLocations();
    }
  }

  goToPreviousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.fetchLocations();
    }
  }

  onSearchChange(query: string): void {
    this.searchSubject.next(query);
  }

  deleteLocation(id: string): void {
    this.locationService.cancelLocation(id).subscribe(() => {
      this.locations = this.locations.filter(l => l.id !== id);
      this.filteredLocations = this.locations;
    });
  }

  private resetLocations(): void {
    this.locations = [];
    this.filteredLocations = [];
    this.totalLocations = 0;
    this.totalPages = 1;
  }
}
