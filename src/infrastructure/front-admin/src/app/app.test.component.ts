import { Component } from '@angular/core';

@Component({
  selector: 'app-test',
  standalone: true,  // ✅ Mark as standalone
  template: `<div>Hello world</div>`, // ✅ Use `template`, not `templateUrl`
  styleUrls: ['./app.component.css'] // ✅ Ensure correct syntax
})
export class AppTestComponent {}
