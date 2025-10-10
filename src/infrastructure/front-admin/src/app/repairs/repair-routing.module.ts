import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { RepairListComponent } from './components/repair-list.component';
import { RepairCreateComponent } from './components/repair-create-component';
import { RepairDetailComponent } from './components/repair-detail.component';

const RepairRoutes: Routes = [
  { path: '', component: RepairListComponent },
  { path: 'create', component: RepairCreateComponent },
  { path: ':id', component: RepairDetailComponent },
];

@NgModule({
  imports: [RouterModule.forChild(RepairRoutes)],
  exports: [RouterModule]
})
export class RepairRoutingModule {
  constructor() {
    console.log('✅ RepairRoutingModule routing Loaded!');
  }
}
