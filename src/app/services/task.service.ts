import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { INewTask, ITask } from '../models/task.model';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class TaskService {
  constructor(private http: HttpClient) {}

  getTasks(): Observable<ITask[]> {
    return this.http.get<ITask[]>('http://localhost:3001/tasks');
  }

  createTask(task: INewTask) {
    return this.http.post<ITask>('http://localhost:3001/tasks', task);
  }

  updateTask(task: ITask) {
    return this.http.put<ITask>(`http://localhost:3001/tasks/${task.id}`, task);
  }
}
