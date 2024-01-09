import {Component, OnInit} from '@angular/core';
import {UserService} from '../../services/user/user.service';
import {AuthService} from '@auth0/auth0-angular';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit{
  public loggedInUser: any;

  constructor(
    public _auth: AuthService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.userService.loggedInUserData$.subscribe((data) => {
      this.loggedInUser = data;
    });
  }
}
