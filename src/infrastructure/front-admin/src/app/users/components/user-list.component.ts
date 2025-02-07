import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
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
  filteredUsers: User[] = [];
  currentPage: number = 1;
  usersPerPage: number = 11;
  totalUsers: number = 0;
  totalPages: number = 1;

  constructor(
    private readonly usersService: UsersService,
    private readonly cdRef: ChangeDetectorRef
  ) {}

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
      this.filteredUsers = users;
      this.cdRef.detectChanges();
    });
  }

  searchUsers(query: string): void {
    this.usersService.searchUsers(query).subscribe((users: User[]) => {
      this.filteredUsers = users;
      this.totalUsers = users.length;
      this.totalPages = Math.ceil(this.totalUsers / this.usersPerPage);
      this.currentPage = 1;
      this.users = users.slice(0, this.usersPerPage);
      this.cdRef.detectChanges();

      if (this.filteredUsers.length === 0) {
        this.fetchUsers();
      }
    });
  }

  toggleUserStatus(user: User): void {}

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
