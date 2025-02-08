import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { OrderListComponent } from './components/order-list.component';
import { OrderDetailComponent } from './components/order-detail.component';

const OrdersRoutes: Routes = [
  { path: '', component: OrderListComponent },
  { path: ':id', component: OrderDetailComponent },
];

@NgModule({
  imports: [RouterModule.forChild(OrdersRoutes)],
  exports: [RouterModule]
})
export class OrdersRoutingModule {
  constructor() {
    console.log('✅ OrdersRoutingModule routing Loaded!');
  }
}
