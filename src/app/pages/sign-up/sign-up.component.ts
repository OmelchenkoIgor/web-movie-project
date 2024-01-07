import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';

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
    private router: Router,
    private snackBar: MatSnackBar,
    private apiService: ApiService
  ) {
    this.registrationForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  public onSubmit() {
    if (this.registrationForm.valid) {
      this.apiService.addUser(this.registrationForm.value).subscribe(
        (response) => {
          localStorage.setItem('authorizationToken', response.token);
          localStorage.setItem('name', response.name);
          this.router.navigate(['/home']);
          console.log(response)
        },
        error => {
          this.snackBar.open(error.error.message, '', {
            duration: 3000,
            panelClass: ['error-snackbar']
          });
          console.log(error);
        }
      )
    } else {
      console.log('Fields are not filled');
    }
  }
}
