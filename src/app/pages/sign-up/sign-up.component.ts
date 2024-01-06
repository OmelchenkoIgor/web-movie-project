import { Component } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ApiService} from '../../services/api.service';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {

  public registrationForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService
  ) {
    this.registrationForm = this.fb.group({
      name: [''],
      email: [''],
      password: ['']
    });
  }

  public onSubmit() {
    this.apiService.addUser(this.registrationForm.value).subscribe(
      (response) => {
        console.log(response)
      },
      error => {
        console.log(error);
      }
    )
  }

}
