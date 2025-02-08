import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { WarrantyListComponent } from './components/warranty-list.component';
import { WarrantyCreateComponent } from './components/warranty-create-component';
import { WarrantyDetailComponent } from './components/warranty-detail.component';

const WarrantyRoutes: Routes = [
  { path: '', component: WarrantyListComponent },
  { path: 'create', component: WarrantyCreateComponent },
  { path: ':id', component: WarrantyDetailComponent },
];

@NgModule({
  imports: [RouterModule.forChild(WarrantyRoutes)],
  exports: [RouterModule]
})
export class WarrantyRoutingModule {
  constructor() {
    console.log('✅ Warranty routing Loaded!');
  }
}
