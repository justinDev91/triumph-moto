import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ConcessionListComponent } from './components/concession.list.component';

const ConcessionsRoutes: Routes = [
  { path: '', component: ConcessionListComponent },
  // { path: 'create', component: MotorcycleCreateComponent },
  // { path: ':id', component: WarrantyDetailComponent },
];

@NgModule({
  imports: [RouterModule.forChild(ConcessionsRoutes)],
  exports: [RouterModule]
})
export class ConcessionsRoutingModule {
  constructor() {
    console.log('✅ ConcessionsRoutingModule routing Loaded!');
  }
}
