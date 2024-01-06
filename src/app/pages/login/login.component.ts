import { Component } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ApiService} from '../../services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  public loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService
  ) {
    this.loginForm = this.fb.group({
      email: [''],
      password: ['']
    });
  }

  public onSubmit() {
    this.apiService.loginUser(this.loginForm.value).subscribe(
      (response) => {
        console.log(response)
      },
      error => {
        console.log(error);
      }
    )
  }
}
