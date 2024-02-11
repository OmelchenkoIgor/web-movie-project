import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../../services/user/user.service';
import {ApiService} from '../../services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
  public loggedInUser: any;
  public movies: any;
  public currentPage: number = 1;
  public totalPages: number = 5000;

  constructor(
    public router: Router,
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
    })

    this.apiService.getMoviesByCriteria(1).subscribe((data) => {
      this.movies = data.results;
    })
  }

  public getImageUrl(posterPath: string): string {
    return `${this.apiService.IMG_URL}/${posterPath}`;
  }

  public goToMovieDetail(movieId: number) {
    this.router.navigate(['/movie', movieId]);
  }

  public onPageChanged(pageNumber: number) {
    this.currentPage = pageNumber;
    this.apiService.getMoviesByCriteria(pageNumber).subscribe((data) => {
      this.movies = data.results;
    });
  }
}
