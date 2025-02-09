import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AuthComponent } from './components/auth.component';

const AuthRoute: Routes = [
  { path: '', component: AuthComponent },

];

@NgModule({
  imports: [RouterModule.forChild(AuthRoute)],
  exports: [RouterModule]
})
export class AuthRoutingModule {
  constructor() {
    console.log('✅ AuthRoutingModule routing Loaded!');
  }
}
