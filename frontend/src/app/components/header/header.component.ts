import { LoginComponent } from './../../pages/login/login.component';
import { AuthService } from './../../services/auth.service';
import { Component, Input, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  constructor(private router: Router, public authService: AuthService, private login: LoginComponent) {}
  open: boolean = false;
  isAuthenticated = false;
  @Input() currentUser?: IUser;
  initials: string | undefined;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['currentUser'] && this.currentUser) {
      this.initials = '';
      if (this.currentUser.firstname) {
        this.initials += this.currentUser.firstname.charAt(0).toUpperCase();
      }
      if (this.currentUser.lastname) {
        this.initials += this.currentUser.lastname.charAt(0).toUpperCase();
      }
    } else {
      this.initials = undefined;
    }
  }
  
  ngOnInit(){
    this.isAuthenticated = this.authService.getIsUserAuthenticated();
  }

  showNavMenu(){
    // console.log(this.activatedRoute.snapshot);
  }

  onLogOut() {
    this.authService.logout();
    location.reload();
  }

  onNavigate() {
    this.router.navigate(['/auth/login']);
    
  }

  onClickProjects() {
    this.router.navigate(['/projects']);
  }

  onClickTasks() {
    this.router.navigate(['/tasks']);
  }

  onClickWorkReport() {
    this.router.navigate(['/work-report']);
  }

  toggleDropdown(){
    this.open = !this.open;
  }
}
