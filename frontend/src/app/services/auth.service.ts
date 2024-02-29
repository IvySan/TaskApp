import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}
  private readonly authUrl = 'http://localhost:3000/auth'
  private userId: any;
  private headers!: HttpHeaders;
  private isAuthenticated: boolean = false;

  ngOnInit(){
      this.validate().subscribe((data : any)=>{
      if (data.email){
        this.isAuthenticated = true;
      }
    })
  }

  login(data: {email: string, password: string}) {
    return this.http.post( this.authUrl + '/login', data);
  }

  validate(){
    const token = this.getAuthToken();
    this.headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
      return this.http.get( this.authUrl + '/validate', {
      headers: this.headers
    })
  }

  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('userId');
    this.router.navigate(['auth/log-in']);
  }

  getAuthToken(){
    return localStorage.getItem('access_token');
  }

  getUserId(){
    return this.userId;
  }

  getIsUserAuthenticated(){
    return this.isAuthenticated;
  }
}