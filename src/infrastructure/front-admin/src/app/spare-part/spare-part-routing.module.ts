import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { SparePartListComponent } from './components/spare.part.list.component';
import { SparePartCreateComponent } from './components/spare.part-create-component';
import { SparePartDetailComponent } from './components/spare.part.detail.component';

const SparePartRoutes: Routes = [
  { path: '', component: SparePartListComponent },
  { path: 'create', component: SparePartCreateComponent },
  { path: ':id', component: SparePartDetailComponent },
];

@NgModule({
  imports: [RouterModule.forChild(SparePartRoutes)],
  exports: [RouterModule]
})
export class SparePartRoutingModule {
  constructor() {
    console.log('✅ SparePartRoutes routing Loaded!');
  }
}
