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
  {
    path: 'spareparts',
    loadChildren: () => import('./spare-part/spare.part.module').then(m => m.SparePartModule),
  },
  {
    path: 'repairs',
    loadChildren: () => import('./repairs/repair.module').then(m => m.RepairsModule),
  },


];
