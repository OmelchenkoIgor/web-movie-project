import {Component, OnInit, Renderer2} from '@angular/core';
import {AuthService} from '@auth0/auth0-angular';
import {UserService} from './services/user/user.service';
import {TranslocoService} from '@ngneat/transloco';
import {NavigationEnd, Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public loggedInUser: any;

  number = 0;

  constructor(
    public _auth: AuthService,
    public userService: UserService,
    public router: Router,
    public translocoService: TranslocoService
  ) {
    const savedWebParams = localStorage.getItem('web-params');
    if (savedWebParams) {
      const webParams = JSON.parse(savedWebParams);
      const savedLanguage = webParams.language;

      if (savedLanguage) {
        this.translocoService.setActiveLang(savedLanguage);
      }
    }

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isCurrentPage('/home');
        this.isCurrentPage('/movies');
        this.isCurrentPage('/tv');
        this.isCurrentPage('/bookmarks');
      }
    });
  }

  ngOnInit() {
    if (this._auth.user$) {
      this._auth.user$.subscribe((data) => {
        this.loggedInUser = data;
        console.log('LoggerIn User', this.loggedInUser);
        this.userService.setLoggedInUserData(this.loggedInUser);
      })
;


    }
    setTimeout( () => {
      this.testMessage();
    }, 3000)

    window.addEventListener('message', (event) => {
      console.log('Received data in AngularApp:', event.data);
    })
  }

  public isAccountPage(): boolean {
    return this.router.url.includes('/account');
  }

  public isCurrentPage(path: string): boolean {
    return this.router.url === path;
  }

  testMessage() {
    const testData = {
      type: 'read'
    };

    window.parent.postMessage(testData, '*');
    console.log('Sent message from AngularApp:', testData);
  }
}
