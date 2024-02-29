import { UserService } from 'src/app/services/user.service';
import { Component, EventEmitter, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProjectService } from 'src/app/services/project.service';
import { TaskService } from 'src/app/services/task.service';
import { UpdateTaskComponent } from '../update-task/update-task.component';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css']
})
export class CreateTaskComponent {
  createTaskForm! : FormGroup;
  projects!: IProject[];
  error!:string;
  taskCreated = new EventEmitter();

  constructor (@Inject(MAT_DIALOG_DATA) public data: {projectId : number}, private ref:MatDialogRef<UpdateTaskComponent>, 
  private taskService: TaskService, private fb: FormBuilder, private projectService: ProjectService, private userService: UserService){
    this.createTaskForm = this.fb.group({
      title: ['',[Validators.required]],
      status: ['',[Validators.required]],
      description: [''],
    });
  }

  onSubmit () {
    if (this.createTaskForm.status === 'INVALID') {
      if (this.createTaskForm.controls?.['title'].errors?.['required'] === true)
        this.error = '*Please enter title.';
    }
    else{
      const data = {...this.createTaskForm.value, projectId: Number(this.data.projectId) , users: [this.userService.currentUserId] }
      this.taskService.createTask(data).subscribe((data)=>{
        console.log(data, 'Created task');
        this.ref.close();
        this.taskCreated.emit();
      })
    }
    
  }

  closeModal(){
    this.ref.close();
  }
}
