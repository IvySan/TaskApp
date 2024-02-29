import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  private readonly usersUrl = 'http://localhost:3000/users/';
  // currentUser?: IUser;
  // getCurrentUser!: Subscription;
  currentUserId  = Number(localStorage.getItem('userId'));


  // ngOnInit(): void {
  //   this.getCurrentUser = this.getUser(this.currentUserId).subscribe(user => this.currentUser = user);
  // }

  // ngOnDestroy(): void {
  //   this.getCurrentUser.unsubscribe();
  // }

  getUsers(): Observable<IUser[]> {
    return this.http.get<IUser[]>(this.usersUrl);
  }

  getUser(userId: number): Observable<IUser | undefined> {
    return this.http.get<IUser>(this.usersUrl + userId);
  }

  getUsersOnProject(projectId:number):Observable<IUser[]>{
    return this.http.get<IUser[]>(this.usersUrl + projectId + '/getUsersOnProject').pipe(
      tap(users => console.log('Users on Project:', users)))
  }

  getUsersNotOnProject(projectId: number):Observable<IUser[]>{
    return this.http.get<IUser[]>(this.usersUrl + projectId + '/getUsersNotOnProject').pipe(
      tap(users => console.log('Other users :', users)))
  }


  setCurrentUserId(currentUserId: number) {
    this.currentUserId = currentUserId;
  }

  addUser(data: any): Observable<any> {
    return this.http.post(this.usersUrl, data);
  }

  updateUser(id : number, data : {firstname : string, lastname : string, email : string}): Observable<any> {
    return this.http.put(this.usersUrl + id , data);
  }

  addTaskToUser(taskId: number, userId: number) {
    return this.http.put(this.usersUrl + userId + '/addTask',{
      taskId,
      userId
    } );
  }

  removeTaskFromUser(userId: number, taskId: number): Observable<any> {
    return this.http.delete(this.usersUrl + userId + '/removeTask', { 
      body: {
        taskId
      }
    } );
  }
  

  addTimeOnTask(data: {userId : number, taskId: number, time : string, date: string}){
    return this.http.put(this.usersUrl + 'addTimeOnTask', data);
  }

  getTimesForUserTask(userId : number){
    return this.http.get<IUserTaskTime[]>(this.usersUrl + 'time' + '/' + userId );
  }
}
