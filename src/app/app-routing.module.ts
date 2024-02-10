import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from './services/guard/auth.guard'

import {HomeComponent} from './pages/home/home.component';
import {AccountComponent} from './pages/account/account.component';
import {MoviesComponent} from './pages/movies/movies.component';
import {TvComponent} from './pages/tv/tv.component';
import {BookmarksComponent} from './pages/bookmarks/bookmarks.component';
import {MovieDetailComponent} from './pages/movie-detail/movie-detail.component';

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'account', component: AccountComponent, canActivate: [AuthGuard]},
  {path: 'movies', component: MoviesComponent},
  {path: 'tv', component: TvComponent},
  {path: 'bookmarks', component: BookmarksComponent},
  {path: 'movie/:id', component: MovieDetailComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
