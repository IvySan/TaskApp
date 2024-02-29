import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription, forkJoin } from 'rxjs';
import { AddUserComponent } from 'src/app/components/modals/add-user/add-user.component';
import { CreateProjectComponent } from 'src/app/components/modals/create-project/create-project.component';
import { DeleteModalComponent } from 'src/app/components/modals/delete-modal/delete-modal.component';
import { RemoveUserComponent } from 'src/app/components/modals/remove-user/remove-user.component';
import { UpdateProjectComponent } from 'src/app/components/modals/update-project/update-project.component';
import { ProjectService } from 'src/app/services/project.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
})
export class ProjectsComponent {
  currentUser?: IUser;
  userId!: number;
  getCurrentUser!: Subscription;
  getProjectsObservable!: Subscription;
  projects: IProject[] = [];
  filterInput:string='';
  getUsersOnProjectObservable!: Subscription;
  usersOnProject:IUser[]=[];
  otherUsers:IUser[]=[];

  constructor(
    private userService: UserService,
    private projectService: ProjectService,
    private dialogRef: MatDialog
  ) {}

  ngOnInit(): void {
    this.getProjectsObservable = this.projectService.getProjects().subscribe((projects: IProject[]) =>
    {this.projects = projects});

    this.userId = this.userService.currentUserId;
    this.getCurrentUser = this.userService.getUser(this.userService.currentUserId).subscribe(user => this.currentUser = user);

    this.dialogRef.afterAllClosed.subscribe(() => {
      this.getProjectsObservable = this.projectService.getProjects().subscribe((projects: IProject[]) =>
        {this.projects = projects});
    });
    
  }

  ngOnDestroy(): void {
    this.getProjectsObservable.unsubscribe();
    this.getCurrentUser.unsubscribe();
  }


  getUserFullName(project: IProject) {
   if (!project.users || !project.users.length) {
      return 'No users';
    }
                  
   let listOfUsers = project.users.map((item) => item.user.firstname + ' ' + item.user.lastname);
      return listOfUsers.join(', ');
   }

  openUpdateProjectModal(projectId: number, title: string, description: string){
    this.dialogRef.open(UpdateProjectComponent, {
      data : {
        id: projectId,
        title: title,
        description: description
      }
    });
  }
  openCreateProjectModal(){
    this.dialogRef.open(CreateProjectComponent, {
      
    });
  }

  openDeleteProjectModal(projectId: number) {
    this.dialogRef.open(DeleteModalComponent, {
      data : {
        type : 'project',
        id: projectId 
      }
    });
  }

  openAddUserModal(projectId: number){
    this.dialogRef.open(AddUserComponent, {
      data: {
        id: projectId
      } 
    });
    console.log(this.otherUsers);
  }

  openRemoveUserModal(projectId: number){
    this.dialogRef.open(RemoveUserComponent, {
      data: {
        id: projectId
      }
    });
    console.log(this.usersOnProject);
  }
}
