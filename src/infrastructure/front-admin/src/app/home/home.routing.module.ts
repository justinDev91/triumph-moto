import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';

const HomeRoute: Routes = [
  { path: '', component: HomeComponent },

];

@NgModule({
  imports: [RouterModule.forChild(HomeRoute)],
  exports: [RouterModule]
})
export class HomeRoutingModule {
  constructor() {
    console.log('✅ HomeRoutingModule routing Loaded!');
  }
}
