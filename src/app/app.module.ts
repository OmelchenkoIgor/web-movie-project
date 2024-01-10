import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';


import {AppComponent} from './app.component';
import {HomeComponent} from './pages/home/home.component';
import {AccountComponent} from './pages/account/account.component';

import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from '@angular/common/http';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {AuthModule} from '@auth0/auth0-angular';
import {TranslocoRootModule} from './transloco-root.module';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AccountComponent,
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
    TranslocoRootModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
