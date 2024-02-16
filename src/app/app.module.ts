import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {AuthModule} from '@auth0/auth0-angular';
import {TranslocoRootModule} from './transloco-root.module';

import {AppComponent} from './app.component';
import {HomeComponent} from './pages/home/home.component';
import {AccountComponent} from './pages/account/account.component';
import {MoviesComponent} from './pages/movies/movies.component';
import {TvComponent} from './pages/tv/tv.component';
import {BookmarksComponent} from './pages/bookmarks/bookmarks.component';
import {MovieDetailComponent} from './pages/movie-detail/movie-detail.component'

import {NZ_I18N} from 'ng-zorro-antd/i18n';
import {en_US} from 'ng-zorro-antd/i18n';
import {registerLocaleData} from '@angular/common';
import en from '@angular/common/locales/en';

import {NzInputModule} from 'ng-zorro-antd/input';
import {NzIconModule} from 'ng-zorro-antd/icon';
import {NzPaginationModule} from 'ng-zorro-antd/pagination';
import {NzSelectModule} from 'ng-zorro-antd/select';
import {NzBreadCrumbModule} from 'ng-zorro-antd/breadcrumb';

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AccountComponent,
    MoviesComponent,
    TvComponent,
    BookmarksComponent,
    MovieDetailComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        MatSnackBarModule,
        BrowserAnimationsModule,
        NoopAnimationsModule,
        AuthModule.forRoot({
            domain: 'dev-4uj7xd5j1fodgl1b.us.auth0.com',
            clientId: 'T4PZc080dZ5OfaDWRSv6RwvJGKUebEi7',
            authorizationParams: {
                redirect_uri: window.location.origin
            }
        }),
        TranslocoRootModule,
        NzInputModule,
        NzIconModule,
        NzPaginationModule,
        NzSelectModule,
        NzBreadCrumbModule
    ],
  providers: [
    {provide: NZ_I18N, useValue: en_US}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
