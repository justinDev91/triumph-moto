import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { UserListComponent } from './components/user-list.component';
import { UserDetailComponent } from './components/user-detail.component';

const UsersRoutes: Routes = [
  { path: '', component: UserListComponent },
  { path: ':id', component: UserDetailComponent }
];

@NgModule({
  imports: [RouterModule.forChild(UsersRoutes)],
  exports: [RouterModule]
})
export class UserRoutingModule {
  constructor() {
    console.log('✅ user routing Loaded!');
  }
}
