import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { BreakdownListComponent } from './components/breakdown.list.component';

const BreakdownsRoutes: Routes = [
  { path: '', component: BreakdownListComponent },
  // { path: 'create', component: MotorcycleCreateComponent },
  // { path: ':id', component: WarrantyDetailComponent },
];

@NgModule({
  imports: [RouterModule.forChild(BreakdownsRoutes)],
  exports: [RouterModule]
})
export class BreakdownsRoutingModule {
  constructor() {
    console.log('✅ BreakdownsRoutingModule routing Loaded!');
  }
}
