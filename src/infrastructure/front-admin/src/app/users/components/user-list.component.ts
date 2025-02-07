import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';
import { User } from '../../shared/models/user.model';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './user-list.component.html',
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  currentPage: number = 1;
  usersPerPage: number = 11;
  totalUsers: number = 0; // Total number of users, if available from API.
  totalPages: number = 1;

  constructor(private readonly usersService: UsersService) {}

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers(): void {
    this.usersService.getAllUsers().subscribe((users: User[]) => {
      this.totalUsers = users.length;
      this.totalPages = Math.ceil(this.totalUsers / this.usersPerPage);
      const startIndex = (this.currentPage - 1) * this.usersPerPage;
      const endIndex = startIndex + this.usersPerPage;
      this.users = users.slice(startIndex, endIndex);
    });
  }

  toggleUserStatus(user: User): void {
    // TODO: Implement status toggle functionality
  }

  deleteUser(user: User): void {
    this.usersService.deleteUser(user.id).subscribe(() => {
      this.users = this.users.filter(u => u.id !== user.id);
    });
  }

  addUser(): void {
    console.log('Redirecting to add user page...');
  }

  goToNextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.fetchUsers();
    }
  }

  goToPreviousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.fetchUsers();
    }
  }
}
