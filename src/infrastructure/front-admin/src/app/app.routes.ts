import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
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
  {
    path: 'orders',
    loadChildren: () => import('./order/orders.module').then(m => m.OrdersModule),
  },
  {
    path: 'motorcycles',
    loadChildren: () => import('./motorcycles/motorcycle.module').then(m => m.MotorcyclesModule),
  },
  {
    path: 'motorcycles-trial',
    loadChildren: () => import('./motorcycle-trial/motorcycle-trial.module').then(m => m.MotorcycleTrialsModule),
  },
  {
    path: 'maintenances',
    loadChildren: () => import('./maintenances/maintenance.module').then(m => m.MaintenancesModule),
  },
  {
    path: 'locations',
    loadChildren: () => import('./locations/location.module').then(m => m.LocationsModule),
  },
  {
    path: 'drivers',
    loadChildren: () => import('./drivers/driver.module').then(m => m.DriversModule),
  },
  {
    path: 'concessions',
    loadChildren: () => import('./concessions/concession.module').then(m => m.DriversModule),
  },
  {
    path: 'companies',
    loadChildren: () => import('./companies/company.module').then(m => m.CompaniesModule),
  },
  {
    path: 'breakdowns',
    loadChildren: () => import('./breakdown/breakdown.module').then(m => m.BreakdwonsModule),
  },
  {
    path: 'appointments',
    loadChildren: () => import('./appointment/appointment.module').then(m => m.AppointmentsModule),
  },
  {
    path: 'login',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
  },


];
