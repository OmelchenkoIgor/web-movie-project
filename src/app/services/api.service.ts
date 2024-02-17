import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {forkJoin, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  API_KEY = '8e1bb9e4dc72a21ca24d9df6e314ba9e';
  BASE_URL = 'https://api.themoviedb.org/3';
  IMG_URL = 'https://image.tmdb.org/t/p/w500';

  constructor(
    private http: HttpClient
  ) {}

  getMovieDetails(movieId: number, language: string): Observable<any> {
    const params = new HttpParams()
      .set('api_key', this.API_KEY)
      .set('language', language);
    return this.http.get(
      `${this.BASE_URL}/movie/${movieId}`,
      {params}
    );
  }

  getMovieVideos(movieId: number, language: string): Observable<any> {
    const params = new HttpParams()
      .set('api_key', this.API_KEY)
      .set('language', language);
    return this.http.get(
      `${this.BASE_URL}/movie/${movieId}/videos`,
      {params}
    );
  }

  getMoviesByCriteria(page: number, language: string): Observable<any> {
    let params = new HttpParams()
      .set('api_key', this.API_KEY)
      .set('page', page.toString())
      .set('language', language);
    return this.http.get(
      `${this.BASE_URL}/discover/movie`,
      {params}
    );
  }

  public searchMovies(query: string, language: string): Observable<any> {
    const params = new HttpParams()
      .set('api_key', this.API_KEY)
      .set('query', query)
      .set('language', language);
    return this.http.get(
      `${this.BASE_URL}/search/movie`,
      {params}
    );
  }

  public getMoviesByIds(movieIds: number[], language: string): Observable<any[]> {
    const params = new HttpParams()
      .set('api_key', this.API_KEY)
      .set('language', language);

    const observables = movieIds.map(movieId => {
      return this.http.get(`${this.BASE_URL}/movie/${movieId}`, { params });
    });

    return forkJoin(observables);
  }
}
