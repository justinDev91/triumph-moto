import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { MotorcycleListComponent } from './components/motorcycle-list.component';
import { MotorcycleCreateComponent } from './components/motorcycle-create-component';

const MotorcycleRoutes: Routes = [
  { path: '', component: MotorcycleListComponent },
  { path: 'create', component: MotorcycleCreateComponent },
  // { path: ':id', component: WarrantyDetailComponent },
];

@NgModule({
  imports: [RouterModule.forChild(MotorcycleRoutes)],
  exports: [RouterModule]
})
export class MotorcyclesRoutingModule {
  constructor() {
    console.log('✅ MotorcyclesRoutingModule routing Loaded!');
  }
}
