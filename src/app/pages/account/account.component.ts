import {Component, OnInit} from '@angular/core';
import {UserService} from '../../services/user/user.service';
import {AuthService} from '@auth0/auth0-angular';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  public loggedInUser: any;

  constructor(
    public _auth: AuthService,
    private userService: UserService,
    private translateService: TranslateService
  ) {}

  ngOnInit() {
    this.userService.loggedInUserData$.subscribe((data) => {
      this.loggedInUser = data;
    });
  }

  public changeLang(value: any) {
    const params = JSON.parse(localStorage.getItem('pg-params') || '{}');
    const lang = params?.lang || 'uk';

    localStorage.setItem('pg-params', JSON.stringify({ lang: value }));
    this.translateService.use(value);
  }
}
