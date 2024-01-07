import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';

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
    private router: Router,
    private _snackBar: MatSnackBar,
    private apiService: ApiService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  public onSubmit() {
    if (this.loginForm.valid) {
      this.apiService.loginUser(this.loginForm.value).subscribe(
        (response) => {
          this.router.navigate(['/home']);
          console.log(response);
        },
        error => {
          this._snackBar.open(error.error.message, '', {
            duration: 3000,
            panelClass: ['error-snackbar']
          });
          console.log(error);
        }
      );
    } else {
      console.log('Fields are not filled');
    }
  }
}
