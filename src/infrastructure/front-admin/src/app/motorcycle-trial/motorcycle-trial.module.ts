import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MotorcycleTrialsRoutingModule } from './motorcycle-trial-routing.module';

@NgModule({
  imports: [
    CommonModule,
    MotorcycleTrialsRoutingModule
  ],
})
export class MotorcycleTrialsModule {
  constructor() {
    console.log('✅ MotorcycleTrialsModule Module Loaded!');
  }
}
