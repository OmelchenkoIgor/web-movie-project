import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss']
})
export class MovieDetailComponent implements OnInit {
  movie: any;
  firstVideoKey: string | undefined;
  videoUrl: SafeResourceUrl | undefined;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const movieId = +params['id'];
      this.apiService.getMovieDetails(movieId).subscribe((data: any) => {
        this.movie = data;
        console.log(data);
      });

      this.apiService.getMovieVideos(movieId).subscribe(data => {
       console.log('video' ,data)
        if (data.results.length > 0) {
          this.firstVideoKey = data.results[0].key;
          console.log('https://www.youtube.com/embed/'+this.firstVideoKey);
          this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${this.firstVideoKey}`);
        }
      });

    });
  }

  public getImageUrl(posterPath: string): string {
    return `${this.apiService.IMG_URL}/${posterPath}`;
  }

  getVideoUrl(key: string): string {
    return `https://www.youtube.com/embed/${key}`;
  }

}
