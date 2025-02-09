import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { MotorcycleTrialListComponent } from './components/motorcycle-trial-list.component';

const MotorcycleTrialRoutes: Routes = [
  { path: '', component: MotorcycleTrialListComponent },
  // { path: 'create', component: MotorcycleCreateComponent },
  // { path: ':id', component: WarrantyDetailComponent },
];

@NgModule({
  imports: [RouterModule.forChild(MotorcycleTrialRoutes)],
  exports: [RouterModule]
})
export class MotorcycleTrialsRoutingModule {
  constructor() {
    console.log('✅ MotorcyclesRoutingModule routing Loaded!');
  }
}
