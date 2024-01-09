import {Component, OnInit} from '@angular/core';
import {AuthService} from '@auth0/auth0-angular';
import {UserService} from './services/user/user.service';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  public loggedInUser: any;

  constructor(
    public _auth: AuthService,
    public userService: UserService,
    public translateService: TranslateService,
  ) {
    const storedParams = localStorage.getItem('pg-params');

    if (!storedParams) {
      localStorage.setItem('pg-params', JSON.stringify({
        lang: 'en',
      }));
    } else {
      const params = JSON.parse(storedParams);
      if (params && typeof params.lang === 'string') {
        this.translateService.setDefaultLang(params.lang);
      } else {
        this.translateService.setDefaultLang('en');
      }
    }
  }

  ngOnInit() {
    if(this._auth.user$) {
      this._auth.user$.subscribe((data) =>{
        this.loggedInUser = data;
        console.log('LoggerIn User', this.loggedInUser);
        this.userService.setLoggedInUserData(this.loggedInUser);
      })
    }
  }
}
