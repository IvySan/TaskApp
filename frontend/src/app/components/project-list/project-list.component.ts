import { Subscription } from 'rxjs';
import { ProjectService } from './../../services/project.service';
import { UserService } from './../../services/user.service';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateTaskComponent } from '../modals/create-task/create-task.component';
import * as dayjs from 'dayjs';
import { Dayjs } from 'dayjs';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css'],
})
export class ProjectListComponent implements OnInit, OnDestroy {
  projects: IProject[] = [];
  getProjectsObservable!: Subscription;
  userId!: number;
  weekDates: Dayjs[]=[];
  currentDate = new Date();
  weekNavigationPosition = 0;

  constructor(
    private userService: UserService,
    private projectService: ProjectService,
    private dialogRef: MatDialog
  ) {}

  ngOnInit(): void {
    this.userId = this.userService.currentUserId;
    this.getProjectsObservable = this.projectService.getProjectsForUser(this.userId).subscribe((projects: IProject[]) =>
      {this.projects = projects});

      this.weekDates = this.getWeekDates(new Date());
      console.log("datumi",this.weekDates);
  }
  ngOnDestroy(): void {
    this.getProjectsObservable.unsubscribe();
  }

  openCreateTaskModal (projectId : number) {
    this.dialogRef.open(CreateTaskComponent, {
      width: '600px',
      data : {
        projectId : projectId
      }
    })
  }

  getWeekDates(date : Date): Dayjs[] {
    const currentDate = date;
    currentDate.setDate(currentDate.getDate() -1);
    let weekDates: Dayjs[] = [];
    const start = dayjs(currentDate).startOf('week').day(1);
    
    for (let i = 0; i < 7; i++) {
      const date = start.add(i, 'day');
      weekDates.push(date);
    }
    return weekDates;
  }

  formatDate(date: Dayjs): string {
    return dayjs(date).format('ddd/DD.MMM');
  }

  navigateBefore(){
    this.weekNavigationPosition -= 1;
    const date = new Date();
    date.setDate(date.getDate() + 7 * this.weekNavigationPosition);
    this.weekDates = this.getWeekDates(date);
  }

  navigateAfter(){
    this.weekNavigationPosition +=1;
    const date = new Date();
    date.setDate(date.getDate() + 7 * this.weekNavigationPosition);
    this.weekDates = this.getWeekDates(date);

  }
}


