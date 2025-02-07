import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from '../services/users.service';
import { User } from '../../shared/models/user.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-detail',
  imports: [
      CommonModule,
    ],
  templateUrl: './user-detail.component.html',
})
export class UserDetailComponent implements OnInit {
  userId!: string;

  user!: User;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly userService: UsersService
  ) {}

  ngOnInit() {
    this.userId = this.route.snapshot.paramMap.get('id')!;
    this.userService.getUserById(this.userId).subscribe((data) => {
      this.user = data;
    });
  }
}
