import { Component, EventEmitter, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProjectService } from 'src/app/services/project.service';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.css']
})
export class DeleteModalComponent {

  taskDeleted = new EventEmitter();
  projectDeleted = new EventEmitter();

  constructor (@Inject(MAT_DIALOG_DATA) public data : {type : string, id : number},
   private ref:MatDialogRef<DeleteModalComponent>,
   private taskService: TaskService,
   private projectService: ProjectService){
  }

  closeModal () {
    this.ref.close();
  }

  deleteTask(taskId : number){
    return this.taskService.deleteTask(taskId).subscribe((data)=>{
      console.log(data, 'Task deleted');
      this.ref.close();
      this.taskDeleted.emit();
     })
   } 

   deleteProject(projectId : number){
    return this.projectService.deleteProject(projectId).subscribe((data)=>{
      console.log(data, 'Project deleted');
      this.ref.close();
      //this.projectDeleted.emit();
      location.reload();
     })
   } 

  delete(){
    if (this.data.type === 'task'){
      this.deleteTask(this.data.id)
    }
    else if(this.data.type==='project'){
       this.deleteProject(this.data.id);
    }
  }
}
