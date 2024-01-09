import {Component, HostListener, OnInit} from '@angular/core';
import {AuthService} from '@auth0/auth0-angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit{
  public loggedInUser: any;
  public showLogoutBlock: boolean = false;
  constructor(public _auth:AuthService) {}

  ngOnInit() {
    if(this._auth.user$) {
      this._auth.user$.subscribe((data) =>{
        this.loggedInUser = data;
        console.log('LoggerIn User', this.loggedInUser);
      })
    }
  }

  public toggleLogoutBlock(): void {
    this.showLogoutBlock = !this.showLogoutBlock;
  }

  @HostListener('document:click', ['$event'])
  public onDocumentClick(event: Event): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.logout-block') && !target.closest('.user-image')) {
      this.showLogoutBlock = false;
    }
  }
}
