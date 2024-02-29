import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './pages/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { TaskComponent } from './components/task/task.component';
import { ProjectListComponent } from './components/project-list/project-list.component';
import { ProjectsComponent } from './pages/projects/projects.component';
import { WorkReportComponent } from './pages/work-report/work-report.component';
import { RegisterComponent } from './pages/register/register.component';
import { EditUserComponent } from './pages/edit-user/edit-user.component';
import {MatDialogModule} from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DeleteModalComponent } from './components/modals/delete-modal/delete-modal.component';
import { UpdateTaskComponent } from './components/modals/update-task/update-task.component';
import { UpdateProjectComponent } from './components/modals/update-project/update-project.component';
import { CreateProjectComponent } from './components/modals/create-project/create-project.component';
import { CreateTaskComponent } from './components/modals/create-task/create-task.component';
import { JwtModule } from "@auth0/angular-jwt";
import { AuthInterceptor } from './services/authInterceptor.service';
import { FilterPipe } from './components/pipes/filter.pipe';
import {MatIconModule} from '@angular/material/icon';
import { AddUserComponent } from './components/modals/add-user/add-user.component';
import { RemoveUserComponent } from './components/modals/remove-user/remove-user.component';
import { MatListModule } from '@angular/material/list';
import { UserFilterPipe } from './components/pipes/user-filter.pipe';
import { LoginComponent } from './pages/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    TaskComponent,
    ProjectListComponent,
    ProjectsComponent,
    WorkReportComponent,
    RegisterComponent,
    EditUserComponent,
    DeleteModalComponent,
    UpdateTaskComponent,
    UpdateProjectComponent,
    CreateProjectComponent,
    CreateTaskComponent,
    FilterPipe,
    AddUserComponent,
    RemoveUserComponent,
    UserFilterPipe,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    MatDialogModule,
    BrowserAnimationsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem('access_token');
        },
        allowedDomains: ['http://localhost:4200'],
        disallowedRoutes: ['http://localhost:4200/auth/'],
      },
    }),
    MatIconModule,
    MatListModule
  ],
  providers: [{provide : HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi:true}, LoginComponent],
  bootstrap: [AppComponent],
  exports: [AppRoutingModule]
})
export class AppModule {}


