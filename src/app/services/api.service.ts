import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public apiSignUp = 'https://backend-mongodb-api.vercel.app/api/users';
  public apiLogin = 'https://backend-mongodb-api.vercel.app/api/users/login';

  constructor(private http: HttpClient) {}

  public addUser(params: any): Observable<any> {
    return this.http.post(this.apiSignUp, params);
  }

  public loginUser(params: any): Observable<any> {
    return this.http.post(this.apiLogin, params);
  }
}
