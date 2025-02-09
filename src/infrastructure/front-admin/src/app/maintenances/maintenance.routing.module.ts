import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { MaintenanceListComponent } from './components/maintenance.list.component';

const MaintenanceRoutes: Routes = [
  { path: '', component: MaintenanceListComponent },
  // { path: 'create', component: MotorcycleCreateComponent },
  // { path: ':id', component: WarrantyDetailComponent },
];

@NgModule({
  imports: [RouterModule.forChild(MaintenanceRoutes)],
  exports: [RouterModule]
})
export class MaintenancesRoutingModule {
  constructor() {
    console.log('✅ MaintenancesRoutingModule routing Loaded!');
  }
}
