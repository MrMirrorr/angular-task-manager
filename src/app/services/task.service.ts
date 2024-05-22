import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject, tap } from 'rxjs';
import { INewTask, ITask } from 'app/models/task.model';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private tasksUrl = `${environment.apiUrl}/tasks`;
  refresh$ = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {}

  getTasks(): Observable<ITask[]> {
    return this.http.get<ITask[]>(this.tasksUrl);
  }

  createTask(task: INewTask) {
    return this.http
      .post<ITask>(this.tasksUrl, task)
      .pipe(tap(() => this.refresh$.next(false)));
  }

  updateTaskStatus(task: ITask) {
    return this.http.put<ITask>(`${this.tasksUrl}/${task.id}`, task);
  }

  updateTask(task: ITask) {
    return this.http
      .put<ITask>(`${this.tasksUrl}/${task.id}`, task)
      .pipe(tap(() => this.refresh$.next(false)));
  }

  deleteTask(taskId: string) {
    return this.http
      .delete<void>(`${this.tasksUrl}/${taskId}`)
      .pipe(tap(() => this.refresh$.next(false)));
  }
}
