import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CompanyListComponent } from './components/company.list.component';

const CompaniesRoutes: Routes = [
  { path: '', component: CompanyListComponent },
  // { path: 'create', component: MotorcycleCreateComponent },
  // { path: ':id', component: WarrantyDetailComponent },
];

@NgModule({
  imports: [RouterModule.forChild(CompaniesRoutes)],
  exports: [RouterModule]
})
export class CompaniesRoutingModule {
  constructor() {
    console.log('✅ CompaniesRoutingModule routing Loaded!');
  }
}
