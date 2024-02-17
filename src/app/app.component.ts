import {Component, OnInit} from '@angular/core';
import {AuthService} from '@auth0/auth0-angular';
import {UserService} from './services/user/user.service';
import {TranslocoService} from '@ngneat/transloco';
import {NavigationEnd, Router} from '@angular/router';
import {distinctUntilChanged, interval, Subscription} from 'rxjs';
import {map, tap} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public loggedInUser: any;
  public savedMovies: any;
  private webParamsSubscription: Subscription;

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
        ['/', '/movies', '/tv', '/bookmarks'].forEach(page => {
          this.isCurrentPage(page);
        });
      }
    });

    const webParams: any = JSON.parse(localStorage.getItem('web-params') || '{}');
    this.savedMovies = webParams.arrMovieId ? webParams.arrMovieId.length : 0;

    this.webParamsSubscription = new Subscription();
    this.webParamsSubscription.add(this.subscribeToWebParamsChanges());
  }


  ngOnInit() {
    if (this._auth.user$) {
      this._auth.user$.subscribe((data) => {
        this.loggedInUser = data;
        console.log('LoggerIn User', this.loggedInUser);
        this.userService.setLoggedInUserData(this.loggedInUser);
      });
    }
  }

  public isCurrentPage(path: string): boolean {
    return this.router.url === path;
  }

  public scrollToTop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

  public subscribeToWebParamsChanges(): Subscription {
    return interval(100).pipe(
      map(() => {
        const webParams: any = JSON.parse(localStorage.getItem('web-params') || '{}');
        const newSavedMovies = webParams.arrMovieId ? webParams.arrMovieId.length : 0;
        return newSavedMovies;
      }),
      distinctUntilChanged(),
      tap(newSavedMovies => {
        if (newSavedMovies !== this.savedMovies) {
          this.savedMovies = newSavedMovies;
        }
      })
    ).subscribe();
  }
}
