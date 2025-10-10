import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MotorcyclesRoutingModule } from './motorcycle-routing.module';

@NgModule({
  imports: [
    CommonModule,
    MotorcyclesRoutingModule
  ],
})
export class MotorcyclesModule {
  constructor() {
    console.log('✅ MotorcyclesModule Module Loaded!');
  }
}
