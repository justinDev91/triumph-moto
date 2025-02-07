import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';

@NgModule({
  imports: [
    CommonModule,
    UserRoutingModule
  ],
})
export class UsersModule {
  constructor() {
    console.log('✅ UsersModule Loaded!');
  }
}
