import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { AuthService } from './services/auth.service';
import { ProjectsComponent } from './pages/projects/projects.component';
import { WorkReportComponent } from './pages/work-report/work-report.component';
import { RegisterComponent } from './pages/register/register.component';
import { EditUserComponent } from './pages/edit-user/edit-user.component';
import { isAuthenticated } from './services/authGuard.service';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [isAuthenticated] },
  { path: 'auth/log-in', component: LoginComponent },
  { path: 'projects', component: ProjectsComponent, canActivate: [isAuthenticated]},
  { path: 'work-report', component: WorkReportComponent, canActivate: [isAuthenticated] },
  { path: 'auth/register', component: RegisterComponent },
  { path: 'edit-user', component: EditUserComponent, canActivate: [isAuthenticated]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthService],
})
export class AppRoutingModule {}
