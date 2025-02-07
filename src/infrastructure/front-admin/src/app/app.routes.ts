import { Routes } from '@angular/router';
import { AppTestComponent } from './app.test.component';
import { UserListComponent } from './users/components/user-list.component';


export const routes: Routes = [
  // { path: 'test', component: UserListComponent }, // <-- Add a test route
  {
    path: 'users',
    loadChildren: () => import('./users/users.module').then(m => m.UsersModule),
  },
];
