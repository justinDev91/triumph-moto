import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersRoutingModule } from './order-routing.module';

@NgModule({
  imports: [
    CommonModule,
    OrdersRoutingModule
  ],
})
export class OrdersModule {
  constructor() {
    console.log('✅ OrdersModule Loaded!');
  }
}
