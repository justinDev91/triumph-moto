import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { UsersService } from '../../users/services/users.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './auth.component.html',
})
export class AuthComponent {
  loginData: { email: string, password: string } = { email: '', password: '' };

  constructor(
    private readonly userService: UsersService,
    private  readonly router: Router) {}

  onLogin(): void {
    const loginDto = {
      email: this.loginData.email,
      password: this.loginData.password
    };

    this.userService.getUserById(loginDto.email).subscribe(
      (user) => {
        if (user) {
          this.router.navigate(['/dashboard']);
        } else {
          alert('Invalid credentials!');
        }
      },
      (error) => {
        console.error('Error logging in:', error);
        alert('An error occurred during login');
      }
    );
  }
}
