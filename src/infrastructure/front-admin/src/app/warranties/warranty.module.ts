import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WarrantyRoutingModule } from './warranty-routing.module';

@NgModule({
  imports: [
    CommonModule,
    WarrantyRoutingModule
  ],
})
export class WarrantiesModule {
  constructor() {
    console.log('✅ Warranties Module Loaded!');
  }
}
