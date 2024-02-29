import { UserService } from '../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  currentUser?: IUser;
  getCurrentUser!: Subscription;

  constructor(
    private userService: UserService,
  ) {}

  ngOnInit(): void {
    this.getCurrentUser = this.userService.getUser(this.userService.currentUserId).subscribe(user => this.currentUser = user);
  }

  ngOnDestroy(): void {
    this.getCurrentUser.unsubscribe();
  }
}


