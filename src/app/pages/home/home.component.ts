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
  public searchQuery: string = '';
  public language: any;

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

    let webParams: any = JSON.parse(localStorage.getItem('web-params') || '{}');
    this.language = webParams.language || 'en';
    this.onPageChanged(webParams.pageNumber ? parseInt(webParams.pageNumber) : 1, this.language);
  }

  public getImageUrl(posterPath: string): string {
    return `${this.apiService.IMG_URL}/${posterPath}`;
  }

  public goToMovieDetail(movieId: number) {
    this.router.navigate(['/movie', movieId]);
  }

  public onPageChanged(pageNumber: number, language: string) {
    this.currentPage = pageNumber;
    this.apiService.getMoviesByCriteria(pageNumber, language).subscribe((data) => {
      this.movies = data.results;

      let webParams: any = JSON.parse(localStorage.getItem('web-params') || '{}');
      webParams.pageNumber = pageNumber;
      localStorage.setItem('web-params', JSON.stringify(webParams));
    });
  }

  public onSearch(language: string) {
    if (this.searchQuery.trim() !== '') {
      this.apiService.searchMovies(this.searchQuery, language).subscribe((data) => {
        this.movies = data.results;
        this.totalPages = data.total_pages;
      });
    } else {
      this.onPageChanged(1, language);
    }
  }
}
