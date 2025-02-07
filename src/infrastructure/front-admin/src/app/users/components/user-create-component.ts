import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { UsersService } from '../services/users.service';
import { User } from '../../shared/models/user.model';
import { CreateUserDto } from '../tdo/create-user.tdo';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-create',
   imports: [
      CommonModule,
      FormsModule,
      RouterModule
    ],
  templateUrl: './user-create-component.html',
})
export class UserCreateComponent implements OnInit {
  user: CreateUserDto = {
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  };

  constructor(
    private readonly usersService: UsersService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {}

  createUser(): void {
    this.usersService.createUser(this.user).subscribe(
      (newUser: User) => {
        this.router.navigate(['/users']);
      },
      (error) => {
        console.error('Error creating user:', error);
      }
    );
  }
}
