import { UserService } from 'src/app/services/user.service';
import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { Subscription } from 'rxjs';
import { ProjectService } from 'src/app/services/project.service';
import { Dayjs } from 'dayjs';
import * as dayjs from 'dayjs';

@Component({
  selector: 'app-work-report',
  templateUrl: './work-report.component.html',
  styleUrls: ['./work-report.component.css'],
})
export class WorkReportComponent implements OnInit {
  currentUser?: IUser;
  getCurrentUser!: Subscription;
  projects: IProject[] = [];
  getProjectsObservable!: Subscription;
  tasks: ITask[] = [];
  getTasksObservable!: Subscription;
  userId! : number;
  userTimeTask : IUserTaskTime[]= [];
  weekDates: Dayjs[]=[];
  currentDate = new Date();
  weekNavigationPosition = 0;
 
  constructor(
    private taskService: TaskService,
    private userService: UserService,
    private projectService: ProjectService
  ) {}

  ngOnInit(): void {
    this.getCurrentUser = this.userService.getUser(this.userService.currentUserId).subscribe(user => this.currentUser = user);
    this.userId = this.userService.currentUserId;
    this.getProjectsObservable = this.projectService.getProjectsForUser(this.userId).subscribe((projects: IProject[]) =>
      {this.projects = projects});

    this.getTasksObservable = this.taskService.getTasks().subscribe((tasks: ITask[]) => {
        this.tasks = tasks.filter((task) => task.users[0] && (task.users[0].userId === this.userId))
    })

    this.userService.getTimesForUserTask(this.userId).subscribe((data)=> {
      this.userTimeTask = data;
    })

    this.weekDates = this.getWeekDates(new Date());
      console.log("datumi",this.weekDates);

  }

  ngOnDestroy(){
    this.getCurrentUser.unsubscribe();
    this.getProjectsObservable.unsubscribe();
    this.getTasksObservable.unsubscribe();
  }

  
  dispalyTimeOnProject(projectId:number, index:number){
    let totalTime = 0;

    const tasksOnProject = this.tasks.filter((task) =>(task.projectId===projectId));

    const timesForDay= this.userTimeTask.filter((item) => {
      return dayjs(item.date).isSame(this.weekDates[index], 'day')
    }); // svi unosi iz tabele za datum, mozda ce da budu taskovi iz razlicitih projekata

    const timesForDayOnPoject = timesForDay.filter((item)=>{
      return tasksOnProject.find((task)=>{
        return task.id === item.taskId;
      })
    })

    //zbir
    timesForDayOnPoject.forEach((elem)=>{
      const time = elem.time;
      const taksHours = Number(time.split(':')[0]);
      const taskMinutes = Number(time.split(':')[1]);
      const totalMinutes = taksHours * 60 + taskMinutes;
      totalTime = totalTime + totalMinutes;
    })
    const hoursToDisplay = Math.floor(totalTime/60);
    const minutesToDisplay = totalTime%60;

    return `${String(hoursToDisplay).padStart(2, '0')}:${String(minutesToDisplay).padStart(2 , '0')}`;
    
  }

  displayTimeOnDay(index:number){
    let totalTime = 0;

    const timesForDay= this.userTimeTask.filter((item) => {
      return dayjs(item.date).isSame(this.weekDates[index], 'day')
    }); 
    
    timesForDay.forEach((elem)=>{
      const time = elem.time;
      const taksHours = Number(time.split(':')[0]);
      const taskMinutes = Number(time.split(':')[1]);
      const totalMinutes = taksHours * 60 + taskMinutes;
      totalTime = totalTime + totalMinutes;
    })
    const hoursToDisplay = Math.floor(totalTime/60);
    const minutesToDisplay = totalTime%60;

    return `${String(hoursToDisplay).padStart(2, '0')}:${String(minutesToDisplay).padStart(2 , '0')}`;
  }

  displayRegularTime(index:number){
    let totalTime = 0;

    const timesForDay= this.userTimeTask.filter((item) => {
      return dayjs(item.date).isSame(this.weekDates[index], 'day')
    });

    timesForDay.forEach((elem)=>{
      const time = elem.time;
      const taksHours = Number(time.split(':')[0]);
      const taskMinutes = Number(time.split(':')[1]);
      const totalMinutes = taksHours * 60 + taskMinutes;
      totalTime = totalTime + totalMinutes;
    })
    if(totalTime>60*8){
      totalTime=60*8;
    }

    const hoursToDisplay = Math.floor(totalTime/60);
    const minutesToDisplay = totalTime%60;

    return `${String(hoursToDisplay).padStart(2, '0')}:${String(minutesToDisplay).padStart(2 , '0')}`;
  }

  displayOvertime(index:number){
    let totalTime = 0;

    const timesForDay= this.userTimeTask.filter((item) => {
      return dayjs(item.date).isSame(this.weekDates[index], 'day')
    });

    timesForDay.forEach((elem)=>{
      const time = elem.time;
      const taksHours = Number(time.split(':')[0]);
      const taskMinutes = Number(time.split(':')[1]);
      const totalMinutes = taksHours * 60 + taskMinutes;
      totalTime = totalTime + totalMinutes;
    })

    if(totalTime>60*8){
      totalTime-=60*8;
    }
    else 
      totalTime=0;

    const hoursToDisplay = Math.floor(totalTime/60);
    const minutesToDisplay = totalTime%60;

    return `${String(hoursToDisplay).padStart(2, '0')}:${String(minutesToDisplay).padStart(2 , '0')}`;
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
