import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RepairRoutingModule } from './repair-routing.module';

@NgModule({
  imports: [
    CommonModule,
    RepairRoutingModule
  ],
})
export class RepairsModule {
  constructor() {
    console.log('✅ RepairsModule Module Loaded!');
  }
}
