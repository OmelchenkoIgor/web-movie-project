import {Component, OnInit} from '@angular/core';
import {UserService} from '../../services/user/user.service';
import {AuthService} from '@auth0/auth0-angular';
import {ApiService} from '../../services/api.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
  public loggedInUser: any;
  public movies: any;

  constructor(
    public router: Router,
    public _auth: AuthService,
    public userService: UserService,
    public apiService: ApiService
  ) {
  }

  ngOnInit() {
    this.userService.loggedInUserData$.subscribe((data) => {
      this.loggedInUser = data;
    });

    this.apiService.getPopularMovies().subscribe((data) => {
      this.movies = data.results;
      console.log(this.movies);
    })
  }

  public getImageUrl(posterPath: string): string {
    return `${this.apiService.IMG_URL}/${posterPath}`;
  }

  public goToMovieDetail(movieId: number) {
    this.router.navigate(['/movie', movieId]);
  }
}
