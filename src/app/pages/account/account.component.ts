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
  public language: string | undefined;

  constructor(
    public _auth: AuthService,
    public userService: UserService,
    public translocoService: TranslocoService
  ) {}

  ngOnInit() {
    const webParams = JSON.parse(localStorage.getItem('web-params') || '{}');
    this.language = webParams.language || 'en';

    this.userService.loggedInUserData$.subscribe((data) => {
      this.loggedInUser = data;
    });
  }

  public changeLanguage(language: string) {
    this.translocoService.setActiveLang(language);

    let webParams: any = JSON.parse(localStorage.getItem('web-params') || '{}');
    webParams.language = language;
    localStorage.setItem('web-params', JSON.stringify(webParams));
  }
}
