import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaintenancesRoutingModule } from './maintenance.routing.module';

@NgModule({
  imports: [
    CommonModule,
    MaintenancesRoutingModule
  ],
})
export class MaintenancesModule {
  constructor() {
    console.log('✅ MaintenancesModule Module Loaded!');
  }
}
