import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AppointmentListComponent } from './components/appointment.list.component';

const AppointmentsRoutes: Routes = [
  { path: '', component: AppointmentListComponent },
  // { path: 'create', component: MotorcycleCreateComponent },
  // { path: ':id', component: WarrantyDetailComponent },
];

@NgModule({
  imports: [RouterModule.forChild(AppointmentsRoutes)],
  exports: [RouterModule]
})
export class AppointmentsRoutingModule {
  constructor() {
    console.log('✅ AppointmentsRoutingModule routing Loaded!');
  }
}
