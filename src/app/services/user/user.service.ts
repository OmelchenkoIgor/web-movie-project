import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private loggedInUserData = new BehaviorSubject<any>(null);
  loggedInUserData$ = this.loggedInUserData.asObservable();

  constructor() { }

  public setLoggedInUserData(data: any) {
    this.loggedInUserData.next(data);
  }
}
