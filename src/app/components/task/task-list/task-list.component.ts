import { Component, OnInit } from '@angular/core';
import { finalize, switchMap, tap } from 'rxjs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TaskService } from 'app/services/task.service';
import { TaskCardComponent } from '../task-card/task-card.component';
import { ITask } from 'app/models/task.model';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [TaskCardComponent, MatProgressSpinnerModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss',
})
export class TaskListComponent implements OnInit {
  isLoading = false;
  error = '';
  public tasks: ITask[] = [];

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.taskService.refresh$
      .pipe(
        tap(() => (this.isLoading = true)),
        switchMap(() =>
          this.taskService
            .getTasks()
            .pipe(finalize(() => (this.isLoading = false)))
        )
      )
      .subscribe((tasksFromServer) => (this.tasks = tasksFromServer));
  }
}
