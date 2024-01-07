import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit{
  public authorizationToken: string | null | undefined;
  public name: string | null | undefined;

  constructor() {}

  ngOnInit() {
    this.authorizationToken = localStorage.getItem('authorizationToken');
    this.name = localStorage.getItem('name');
  }

  public lonOut() {
    localStorage.removeItem('authorizationToken');
    localStorage.removeItem('name');

    location.reload();
  }
}
