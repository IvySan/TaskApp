import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  data: any;
  users: IUser[] = [];
  currentUser!: IUser;
  registerForm!: FormGroup;
  errMessage1!: string;
  errMessage2!: string;
  errMessage3!: string;
  errMessage4!: string;
  
  today = new Date(Date.now());

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private userService: UserService
  ) {
    this.registerForm = this.fb.group({
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      password: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnInit(): void {}

  
  onSubmit() {
    
    if (this.registerForm.status === 'INVALID') {
      if (
        this.registerForm.controls?.['firstname'].errors?.['required'] === true
      ) {
        this.errMessage1 = '*Please enter your first name.';
      }
      if (
        this.registerForm.controls?.['lastname'].errors?.['required'] === true
      ) {
        this.errMessage2 = '*Please enter your last name.';
      }
      if (this.registerForm.controls?.['email'].errors?.['required'] === true)
        this.errMessage3 = '*Please enter your email.';
      else if (this.registerForm.controls?.['email'].errors?.['email'] === true)
        this.errMessage3 = '*The entered email is not valid.';
      if (
        this.registerForm.controls?.['password'].errors?.['required'] === true
      )
        this.errMessage4 = '*Please enter your password.';
      return;
    }

    this.data = {
      firstname: this.registerForm.controls?.['firstname'].value,
      lastname: this.registerForm.controls?.['lastname'].value,
      // createdAt: `${this.today.getDate()}.${
      //   this.today.getMonth() + 1
      // }.${this.today.getFullYear()}`,
      // updatedAt: `${this.today.getDate()}.${
      //   this.today.getMonth() + 1
      // }.${this.today.getFullYear()}`,
      password: this.registerForm.controls?.['password'].value,
      email: this.registerForm.controls?.['email'].value,
    };

    this.userService.addUser(this.data).subscribe((user) => {
      alert('The user is successfully registered!');
      this.userService.setCurrentUserId(user.id);
      // this.authService.changeLoggedIn();
      this.router.navigate(['']);
    });
  }

  onLogin() {
    this.router.navigate(['auth/log-in']);
  }
}
