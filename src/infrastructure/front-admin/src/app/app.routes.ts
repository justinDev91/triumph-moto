import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'users',
    loadChildren: () => import('./users/users.module').then(m => m.UsersModule),
  },
  {
    path: 'warranties',
    loadChildren: () => import('./warranties/warranty.module').then(m => m.WarrantiesModule),
  },


];
