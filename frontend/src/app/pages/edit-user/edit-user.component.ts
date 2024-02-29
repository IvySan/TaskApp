import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  editUserForm: FormGroup;
  currentUser?: IUser;
  getCurrentUser!: Subscription;
  currentUserId! : number;

  constructor (private fb: FormBuilder, private userService: UserService) {
    this.editUserForm = this.fb.group({
      firstname: [''],
      lastname: [''],
      email: ['', [Validators.email]]
    });
  }

  ngOnInit() {
    this.getCurrentUser = this.userService.getUser(this.userService.currentUserId).subscribe(user => {
      this.currentUser = user;
      this.editUserForm.patchValue({
        firstname: user?.firstname,
        lastname: user?.lastname,
        email: user?.email,
      });
    });
    this.currentUserId = this.userService.currentUserId;
  }
  ngOnDestroy(): void {
    this.getCurrentUser.unsubscribe();
  }

  onSubmit () {
    this.userService.updateUser(this.currentUserId, this.editUserForm.value).subscribe((data)=> {
      if (data){
        alert(`User Info Successfully updated.\n
        firstname : ${data.firstname}\n
        lastname : ${data.lastname}\n
        email : ${data.email} `);
        this.editUserForm.reset();
      }

      this.getCurrentUser = this.userService.getUser(this.userService.currentUserId).subscribe(user => {
        this.currentUser = user;
        this.editUserForm.patchValue({
          firstname: user?.firstname,
          lastname: user?.lastname,
          email: user?.email,
        });
      });
    });
  }

}
