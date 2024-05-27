import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { finalize, switchMap, tap } from 'rxjs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TaskService } from 'app/services/task.service';
import { TaskCardComponent } from 'app/components/task';
import { ITask } from 'app/models/task.model';
import { MainContentComponent } from 'app/components/common';

@Component({
  selector: 'app-task-list-page',
  standalone: true,
  imports: [
    TaskCardComponent,
    MatProgressSpinnerModule,
    MainContentComponent,
    RouterLink,
  ],
  templateUrl: './task-list-page.component.html',
  styleUrl: './task-list-page.component.scss',
})
export class TaskListPageComponent implements OnInit {
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
