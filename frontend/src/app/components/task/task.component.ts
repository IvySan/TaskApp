import { TaskService } from 'src/app/services/task.service';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { DeleteModalComponent } from '../modals/delete-modal/delete-modal.component';
import { UpdateTaskComponent } from '../modals/update-task/update-task.component';
import { Dayjs } from 'dayjs';
import * as dayjs from 'dayjs';


@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css'],
})
export class TaskComponent implements OnInit, OnDestroy {
  @Input('weekDates') weekDates: Dayjs[]=[];
  tasks: ITask[] = [];
  getTasksObservable!: Subscription;
  userId! : number;
  userTimeTask : IUserTaskTime[]= [];
  @Input() projectId!: number;
  usersTasks : ITask[] = [];
  otherTasks: ITask[] = [];
  getTimesObservable!: Subscription;

  constructor(
    private taskService: TaskService,
    private userService: UserService,
    private dialogRef : MatDialog
  ) {}

  ngOnInit() {
  this.userId = this.userService.currentUserId;

  this.getTasksObservable = this.taskService
  .getTasks()
  .subscribe((tasks: ITask[]) => {
    this.usersTasks = tasks.filter((task) => task.users[0] && (task.users[0].userId === this.userId) && (task.projectId===this.projectId))
    this.otherTasks = tasks.filter((task) => !task.users[0] && (task.projectId===this.projectId))
  });

  this.dialogRef.afterAllClosed.subscribe(() => {
    this.getTasksObservable = this.taskService
    .getTasks()
    .subscribe((tasks: ITask[]) => {
      this.usersTasks = tasks.filter((task) => task.users[0] && (task.users[0].userId === this.userId) && (task.projectId===this.projectId))
      this.otherTasks = tasks.filter((task) => !task.users[0] && (task.projectId===this.projectId))
    });
  });

  this.getTimesObservable=this.userService.getTimesForUserTask(this.userId).subscribe((data)=> {
    this.userTimeTask = data;
  })
}

  ngOnDestroy(): void {
    this.getTasksObservable.unsubscribe();
    this.getTimesObservable.unsubscribe();
  }

 

  openUpdateTaskModal (taskId : number, title : string, status: string, description: string, projectId: number | undefined) {
    this.dialogRef.open(UpdateTaskComponent, {
      width: '600px',
      data : {
        id : taskId,
        title: title,
        status: status,
        description: description,
        projectId: projectId
      }
    })
  }

  openDeleteTaskModal(taskId: number) {
    this.dialogRef.open(DeleteModalComponent, {
      data : {
       type : 'task',
       id: taskId }
    });
  }

  submitTime(event: any, taskId: number){
    const inputValue = event.target.value;
    if (!inputValue){
      return;
    }

    const inputIndex = event.target.name.slice(-1);
    const formattedString = this.weekDates[inputIndex].format('YYYY-MM-DD HH:mm:ss');

    const data = {
      userId: this.userId,
      taskId: taskId,
      time: inputValue,
      date: formattedString
    }


    this.userService.addTimeOnTask(data).subscribe((res)=>{
      const timesForUserObservable = this.userService.getTimesForUserTask(this.userId).subscribe((data)=> {
        this.userTimeTask = data;
        if (data){
          timesForUserObservable.unsubscribe();
        }
      })
      return this.userTimeTask.push(res as IUserTaskTime);
    })

  }

  getTotalTimePerDay(index:number){
    let totalTime = 0;

    const timesForDay= this.userTimeTask.filter((item) => {
      return dayjs(item.date).isSame(this.weekDates[index], 'day')
    }); 

    const timesForDayOnPoject = timesForDay.filter((item)=>{
      return this.usersTasks.find((task)=>{
        return task.id === item.taskId;
      })
    })

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

  getTotalTime(taskId: number){
    let totalTime = 0;
    const timesForTask = this.userTimeTask.filter((item) => item.taskId === taskId);
    timesForTask.forEach((elem)=>{
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

  displayTimeForDayOnTask(taskId: number, index: number){
    const taskTime = this.userTimeTask.filter((item) => {
      return item.taskId === taskId && (dayjs(item.date).isSame(this.weekDates[index], 'day'))
    });

    if (!taskTime[0]){
      return '';
    }

    const time = taskTime[0].time;
    const taksHours = Number(time.split(':')[0]);
    const taskMinutes = Number(time.split(':')[1]);
    const totalMinutes = taksHours * 60 + taskMinutes;

    const hoursToDisplay = Math.floor(totalMinutes/60);
    const minutesToDisplay = totalMinutes%60;

    return `${String(hoursToDisplay).padStart(2, '0')}:${String(minutesToDisplay).padStart(2 , '0')}`;
  }

  showAssignButton(task : ITask){
    return task.users.find(item => item.userId === this.userId)
  }

  onSelectChange(event: Event){
    let taskId = Number((event.target as HTMLSelectElement).value);
    const task =this.otherTasks.find((item)=>item.id===taskId);
    if(task)
      this.assignToTask(task);

  }

  assignToTask(task: ITask){
    this.userService.addTaskToUser(task.id, this.userId).subscribe((data)=>{
      if (data){
        const taskObservable = this.taskService
        .getTasks()
        .subscribe((tasks: ITask[]) => {
          this.usersTasks = tasks.filter((task) => task.users[0] && (task.users[0].userId === this.userId) && (task.projectId===this.projectId))
          this.otherTasks = tasks.filter((task) => !task.users[0] && (task.projectId===this.projectId));

        taskObservable.unsubscribe();

        });
      }
    });
  }

  removeFromTask(task: ITask){
    this.userService.removeTaskFromUser(this.userId, task.id).subscribe((data)=>{
      if (data){
        const taskObservable = this.taskService
        .getTasks()
        .subscribe((tasks: ITask[]) => {
          this.usersTasks = tasks.filter((task) => task.users[0] && (task.users[0].userId === this.userId) && (task.projectId===this.projectId))
          this.otherTasks = tasks.filter((task) => !task.users[0] && (task.projectId===this.projectId));
        
        this.getTimesObservable=this.userService.getTimesForUserTask(this.userId).subscribe((data)=> {
            this.userTimeTask = data;
            this.getTimesObservable.unsubscribe();
        })

        taskObservable.unsubscribe();
        });
     
      }
    });
  }

}