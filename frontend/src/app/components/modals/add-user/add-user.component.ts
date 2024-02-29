import { ProjectService } from 'src/app/services/project.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSelectionList } from '@angular/material/list';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css'],
})
export class AddUserComponent implements OnInit {
  getOtherUsersObservable!: Subscription;
  otherUsers: IUser[] = [];
  searchTerm: string ='';
  
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {id: number},
    private ref:MatDialogRef<AddUserComponent>,
    private userService: UserService,
    private projectService: ProjectService
    ){}

  ngOnInit() {
    this.getOtherUsersObservable = this.userService.getUsersNotOnProject(this.data.id).subscribe((users:IUser[])=>
    {this.otherUsers = users;});
  }

  ngOnDestroy(){
    this.getOtherUsersObservable.unsubscribe();
  }

  onSubmit (data: MatSelectionList) {
    const dataForUpdating = data.selectedOptions.selected.map((item)=>{
      return {projectId: this.data.id, userId:item.value}
    })
    this.projectService.addUsersToProject(dataForUpdating).subscribe((data)=>{
      console.log(data);
      this.ref.close();
      this.getOtherUsersObservable = this.userService.getUsersNotOnProject(this.data.id).subscribe((users:IUser[])=>
        {
          this.otherUsers = users;
          
        });
  })
  }

  closeModal (){
    this.ref.close();
  }

}
