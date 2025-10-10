import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { LocationListComponent } from './components/location.list.component';

const LocationsRoutes: Routes = [
  { path: '', component: LocationListComponent },
  // { path: 'create', component: MotorcycleCreateComponent },
  // { path: ':id', component: WarrantyDetailComponent },
];

@NgModule({
  imports: [RouterModule.forChild(LocationsRoutes)],
  exports: [RouterModule]
})
export class LocationsRoutingModule {
  constructor() {
    console.log('✅ LocationsRoutingModule routing Loaded!');
  }
}
