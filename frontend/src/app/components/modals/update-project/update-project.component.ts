import { Component, EventEmitter, Inject } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-update-project',
  templateUrl: './update-project.component.html',
  styleUrls: ['./update-project.component.css']
})
export class UpdateProjectComponent {
  editProjectForm! : FormGroup;
  projects!: IProject[];
  projectUpdated = new EventEmitter();

  constructor (@Inject(MAT_DIALOG_DATA) public data: {id: number, title: string, description: string}, private ref:MatDialogRef<UpdateProjectComponent>, 
  private fb: FormBuilder, private projectService: ProjectService){
    this.editProjectForm = this.fb.group({
      title: [''],
      description: ['']
    });
    this.editProjectForm.patchValue({
      title: this.data.title,
      description: this.data.description
    })
  }

  onSubmit() {
    this.projectService.updateProject(this.data.id, this.editProjectForm.value).subscribe((data)=>{
      console.log(data, 'Updated project');
      this.ref.close();
      this.projectUpdated.emit();
    })
  }

  closeModal (){
    this.ref.close();
  }
}
