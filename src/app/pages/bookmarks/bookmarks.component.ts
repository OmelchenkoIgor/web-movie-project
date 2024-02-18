import {Component, OnInit} from '@angular/core';
import {ApiService} from '../../services/api.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-bookmarks',
  templateUrl: './bookmarks.component.html',
  styleUrls: ['./bookmarks.component.scss']
})
export class BookmarksComponent implements OnInit {
  movies: any;

  constructor(
    public router: Router,
    public apiService: ApiService
  ) {
  }

  ngOnInit() {
    let webParams: any = JSON.parse(localStorage.getItem('web-params') || '{}');

    this.apiService.getMoviesByIds(webParams.arrMovieId, webParams.language).subscribe((data) => {
      this.movies = data;
      console.log(this.movies);
    })
  }

  public goToMovieDetail(movieId: number) {
    this.router.navigate(['/movie', movieId], { queryParams: { source: 'bookmarks' } });
  }

  public getImageUrl(posterPath: string): string {
    return `${this.apiService.IMG_URL}/${posterPath}`;
  }
}
