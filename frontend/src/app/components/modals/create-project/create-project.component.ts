import { Component, EventEmitter, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.css']
})
export class CreateProjectComponent {
  createProjectForm! : FormGroup;
  projects!: IProject[];
  error!:string;
  projectCreated = new EventEmitter();

  constructor (@Inject(MAT_DIALOG_DATA) public data: {id : number}, private ref:MatDialogRef<CreateProjectComponent>, 
  private fb: FormBuilder, private projectService: ProjectService){
    this.createProjectForm = this.fb.group({
      title: ['',[Validators.required]],
      description: ['']
    });
  }

  onSubmit() {
    if (this.createProjectForm.status === 'INVALID') {
      if (this.createProjectForm.controls?.['title'].errors?.['required'] === true)
        this.error = '*Please enter title.';
    }
    else{
      this.projectService.createProject(this.createProjectForm.value).subscribe((data)=>{
        console.log(data, 'Created project');
        this.ref.close();
        this.projectCreated.emit();
      })
    }
    
  }

  closeModal (){
    this.ref.close();
  }
}
