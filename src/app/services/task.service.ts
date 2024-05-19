import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap, catchError, finalize } from 'rxjs';
import { INewTask, ITask } from '../models/task.model';

@Injectable({ providedIn: 'root' })
export class TaskService {
  private tasksUrl = 'http://localhost:3001/tasks';
  private tasksSubject = new BehaviorSubject<ITask[]>([]);
  public tasks$ = this.tasksSubject.asObservable();
  private isLoadingSubject = new BehaviorSubject<boolean>(false);
  public isLoading$ = this.isLoadingSubject.asObservable();
  private errorSubject = new BehaviorSubject<string>('');
  public error$ = this.errorSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadTasks();
  }

  private loadTasks() {
    this.isLoadingSubject.next(true);

    this.http
      .get<ITask[]>(this.tasksUrl)
      .pipe(
        tap((tasksFromServer) => {
          this.tasksSubject.next(tasksFromServer);
          this.errorSubject.next('');
        }),
        catchError((error) => {
          console.error('Error loading tasks:', error);
          this.errorSubject.next(error.message);
          throw new Error(error.message);
        }),
        finalize(() => this.isLoadingSubject.next(false))
      )
      .subscribe();
  }

  getTasks(): Observable<ITask[]> {
    return this.tasks$;
  }

  createTask(task: INewTask): Observable<ITask> {
    return this.http.post<ITask>(this.tasksUrl, task).pipe(
      tap((newTaskFromServer: ITask) => {
        const currentTasks = this.tasksSubject.getValue();
        currentTasks.push(newTaskFromServer);
        this.tasksSubject.next(currentTasks);
      })
    );
  }

  updateTask(task: ITask): Observable<ITask> {
    return this.http.put<ITask>(`${this.tasksUrl}/${task.id}`, task);
  }

  deleteTask(taskId: string): Observable<void> {
    return this.http.delete<void>(`${this.tasksUrl}/${taskId}`).pipe(
      tap(() => {
        const currentTasks = this.tasksSubject.getValue();
        const updatedTasks = currentTasks.filter((task) => task.id !== taskId);
        this.tasksSubject.next(updatedTasks);
      })
    );
  }
}
