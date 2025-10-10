import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { DriverListComponent } from './components/driver.list.component';

const DriversRoutes: Routes = [
  { path: '', component: DriverListComponent },
  // { path: 'create', component: MotorcycleCreateComponent },
  // { path: ':id', component: WarrantyDetailComponent },
];

@NgModule({
  imports: [RouterModule.forChild(DriversRoutes)],
  exports: [RouterModule]
})
export class DriversRoutingModule {
  constructor() {
    console.log('✅ DriversRoutingModule routing Loaded!');
  }
}
