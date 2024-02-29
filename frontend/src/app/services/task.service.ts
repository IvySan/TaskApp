import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private readonly tasksUrl = 'http://localhost:3000/tasks';

  constructor( private http: HttpClient) {}

  getTasks(): Observable<ITask[]> {
    return this.http.get<ITask[]>(this.tasksUrl);
  }

  getTasksForUser(userId?: number): Observable<ITask[]> {
    return this.http.get<ITask[]>(this.tasksUrl + '?userId=' + userId);
  }
  getTasksForProject(projectId:number):Observable<ITask[]>{
    return this.http.get<ITask[]>(this.tasksUrl + projectId);
  }
  
  createTask(data:ITask):Observable<ITask>{
    return this.http.post<ITask>(this.tasksUrl,data);
  }

  updateTask(taskId: number, data: Partial<ITask>): Observable<ITask>{
    return this.http.put<ITask>(this.tasksUrl + '/' + taskId, data);
  }

  deleteTask(taskId : number): Observable<ITask> {
    return this.http.delete<ITask>(this.tasksUrl + '/' + taskId);
  }

  // getTasksRelatedByProject(projectId: number): Observable<Task[]> {
  //   return this.getTasks().pipe(
  //     map((tasks: Task[]) =>
  //       tasks.filter((task) => task.relatedProjectId === projectId)
  //     )
  //   );
  // }
}
