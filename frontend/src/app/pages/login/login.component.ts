import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm!: FormGroup;
  errMessage1!: string;
  errMessage2!: string;
  loggedIn!: boolean;
  users: IUser[] = [];
  

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }






  
  onSignUp() {
    this.router.navigate(['auth/register']);
  }

  onSubmit() {
    if (this.loginForm.status === 'INVALID') {
      if (this.loginForm.controls?.['email'].errors?.['required'] === true)
        this.errMessage1 = '*Please enter your email.';
      else if (this.loginForm.controls?.['email'].errors?.['email'] === true)
        this.errMessage1 = '*The entered email is not valid.';
      if (this.loginForm.controls?.['password'].errors?.['required'] === true)
        this.errMessage2 = '*Please enter your password.';
      return;
    }


    const val = this.loginForm.value;
    this.authService.login(val).subscribe((data : any)=>{
      localStorage.setItem('access_token', data.access_token);
      localStorage.setItem('userId', data.user.id);
      return this.router.navigate(['']);
    });
  }

}
