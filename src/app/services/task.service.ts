import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { INewTask, ITask } from '../models/task.model';

@Injectable({ providedIn: 'root' })
export class TaskService {
  private tasksSubject: BehaviorSubject<ITask[]> = new BehaviorSubject<ITask[]>(
    []
  );
  tasks$ = this.tasksSubject.asObservable();

  tasksUrl = 'http://localhost:3001/tasks';

  constructor(private http: HttpClient) {}

  fetchTasks(): Observable<ITask[]> {
    return this.http.get<ITask[]>(this.tasksUrl).pipe(
      tap((tasksFromServer: ITask[]) => {
        this.tasksSubject.next(tasksFromServer);
      })
    );
  }

  createTask(task: INewTask) {
    return this.http.post<ITask>(this.tasksUrl, task).pipe(
      tap((newTaskFromServer: ITask) => {
        const currentTasks = this.tasksSubject.getValue();
        currentTasks.push(newTaskFromServer);
        this.tasksSubject.next(currentTasks);
      })
    );
  }

  updateTask(task: ITask) {
    return this.http.put<ITask>(`${this.tasksUrl}/${task.id}`, task);
  }

  deleteTask(taskId: string) {
    return this.http.delete<void>(`${this.tasksUrl}/${taskId}`).pipe(
      tap(() => {
        const currentTasks = this.tasksSubject.getValue();
        const updatedTasks = currentTasks.filter((task) => task.id !== taskId);
        this.tasksSubject.next(updatedTasks);
      })
    );
  }
}
