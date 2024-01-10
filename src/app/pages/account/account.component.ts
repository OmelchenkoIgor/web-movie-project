import {Component, OnInit} from '@angular/core';
import {UserService} from '../../services/user/user.service';
import {AuthService} from '@auth0/auth0-angular';
import {TranslocoService} from '@ngneat/transloco';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  public loggedInUser: any;

  constructor(
    public _auth: AuthService,
    public userService: UserService,
    public translocoService: TranslocoService
  ) {}

  ngOnInit() {
    this.userService.loggedInUserData$.subscribe((data) => {
      this.loggedInUser = data;
    });
  }

  public changeLanguage(language: string): void {
    this.translocoService.setActiveLang(language);

    const webParams = { language };
    localStorage.setItem('web-params', JSON.stringify(webParams));
  }
}
