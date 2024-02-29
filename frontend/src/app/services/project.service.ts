import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private readonly projectsUrl = 'http://localhost:3000/projects/';
  currentProjectId!: number;

  constructor(private http: HttpClient) {}

  getProjects(): Observable<IProject[]> {
    return this.http.get<IProject[]>(this.projectsUrl);
  }

  deleteProject(projectId : number): Observable<IProject> {
    return this.http.delete<IProject>(this.projectsUrl + projectId);
  }

  createProject(data:IProject):Observable<IProject>{
    return this.http.post<IProject>(this.projectsUrl, data);
  }
  
  updateProject(projectId : number, data : {title : string , description : string}): Observable<IProject> {
    return this.http.put<IProject>(this.projectsUrl + projectId, data);
  }

  getProjectsForUser(userId : number){
    return this.http.get<IProject[]>(this.projectsUrl + userId + '/getProjectsForUser');
  }

  addUsersToProject(data:{projectId: number, userId: number}[]){
    const requests = data.map(item=>{
      return this.http.post(this.projectsUrl + item.userId + '/addProject', {
        projectId: item.projectId
      })
    })

    return forkJoin(requests);
  }

  removeUsersFromProject(data : {projectId: number, userId: number}[]){
    const requests = data.map(item => {
      const data = {projectId: item.projectId}
      return this.http.delete(this.projectsUrl + item.userId + '/removeProject',{
        body: data
      });
    })

   return forkJoin(requests);
  }


}
