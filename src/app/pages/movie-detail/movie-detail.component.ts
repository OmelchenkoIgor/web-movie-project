import {Component, HostListener, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {ApiService} from '../../services/api.service';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss']
})
export class MovieDetailComponent implements OnInit {
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkScreenSize();
  }

  movie: any;
  firstVideoKey: string | undefined;
  videoUrl: SafeResourceUrl | undefined;
  isMobileScreen: boolean = false;
  movieId: string | undefined;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    let webParams: any = JSON.parse(localStorage.getItem('web-params') || '{}');
    let language = webParams.language || 'en';

    this.route.params.subscribe(params => {
      const movieId = +params['id'];
      this.apiService.getMovieDetails(movieId, language).subscribe((data: any) => {
        this.movie = data;
        this.movieId = movieId.toString();
        console.log(this.movie);
      });

      this.apiService.getMovieVideos(movieId, language).subscribe(data => {
        if (data.results.length > 0) {
          this.firstVideoKey = data.results[0].key;
          console.log(data.results);
          this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${this.firstVideoKey}`);
        }
      });
    });

    this.checkScreenSize();
  }

  public getImageUrl(posterPath: string) {
    return `${this.apiService.IMG_URL}/${posterPath}`;
  }

  public checkScreenSize() {
    this.isMobileScreen = window.innerWidth < 768;
  }

  public isMoviePage(): boolean {
    return this.route.snapshot.url[0].path === 'movie';
  }
}
