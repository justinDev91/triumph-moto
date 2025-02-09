import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    RouterModule
  ],
  templateUrl: './home.component.html',
})
export class HomeComponent {

  constructor() {
    console.log('✅ app-home component loaded!');
  }
}
