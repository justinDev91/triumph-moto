import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../shared/models/user.model';
import { CreateUserDto } from '../tdo/create-user.tdo';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private readonly apiUrl = 'http://localhost:3000/users';

  constructor(private readonly http: HttpClient) {}

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}`);
  }

  getUserById(id: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`);
  }

  createUser(createUserDto: CreateUserDto): Observable<User> {
    return this.http.post<User>(this.apiUrl, createUserDto);
  }

  deleteUser(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  searchUsers(query: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/search?query=${query}`);
  }

  filterUsersByStatus(status: 'active' | 'inactive'): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/filter-by-status?status=${status}`);
  }

  toggleUserStatus(id: string): Observable<void> {
    return this.http.patch<void>(`${this.apiUrl}/${id}/toggle-status`, {});
  }

}
