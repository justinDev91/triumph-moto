import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SparePartRoutingModule } from './spare-part-routing.module';

@NgModule({
  imports: [
    CommonModule,
    SparePartRoutingModule
  ],
})
export class SparePartModule {
  constructor() {
    console.log('✅ SparePartModule Loaded!');
  }
}
