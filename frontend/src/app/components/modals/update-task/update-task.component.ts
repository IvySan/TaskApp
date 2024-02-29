import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-update-task',
  templateUrl: './update-task.component.html',
  styleUrls: ['./update-task.component.css']
})
export class UpdateTaskComponent{
  editTaskForm! : FormGroup;
  projects!: IProject[];
  taskUpdated = new EventEmitter();

  constructor (@Inject(MAT_DIALOG_DATA) public data: {id : number, title : string, status: string, description: string, projectId: number}, private ref:MatDialogRef<UpdateTaskComponent>, 
  private taskService: TaskService, private fb: FormBuilder){
    this.editTaskForm = this.fb.group({
      title: ['',],
      status: [''],
      description: [''],
    });
    this.editTaskForm.patchValue({
      title : data.title,
      status : data.status,
      description : data.description
    })
  }

  onSubmit () {
    const formValues = {...this.editTaskForm.value, projectId : Number(this.data.projectId)};
    this.taskService.updateTask(this.data.id, formValues).subscribe((data)=>{
      console.log(data, 'Updated task');
      this.ref.close();
      this.taskUpdated.emit();
    })
  }

  closeModal (){
    this.ref.close();
  }
}
