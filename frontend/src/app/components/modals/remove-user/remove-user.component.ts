import { ProjectService } from 'src/app/services/project.service';
import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSelectionList } from '@angular/material/list';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-remove-user',
  templateUrl: './remove-user.component.html',
  styleUrls: ['./remove-user.component.css']
})
export class RemoveUserComponent implements OnInit, OnDestroy {
  getUsersOnProjectObservable!: Subscription;
  usersOnProject: IUser[] = [];
  searchTerm: string ='';

  constructor(@Inject(MAT_DIALOG_DATA) public data: {id : number},private ref:MatDialogRef<RemoveUserComponent>, private userService: UserService,
  private projectService: ProjectService){
  }
  ngOnInit() {
    this.getUsersOnProjectObservable = this.userService.getUsersOnProject(this.data.id).subscribe((users:IUser[])=>
    {
      this.usersOnProject = users;
    });
  }

  ngOnDestroy() {
      this.getUsersOnProjectObservable.unsubscribe();
  }
  
  onSubmit(data : MatSelectionList) {
   const dataForUpdating = data.selectedOptions.selected.map((item) => {
      return {projectId: this.data.id, userId: item.value}
   })

   this.projectService.removeUsersFromProject(dataForUpdating).subscribe((data)=>{
    console.log(data);
    this.ref.close();
    this.getUsersOnProjectObservable = this.userService.getUsersOnProject(this.data.id).subscribe((users:IUser[])=>
      {
        this.usersOnProject = users;
      });
   });
  }

  closeModal (){
    this.ref.close();
  }

}
