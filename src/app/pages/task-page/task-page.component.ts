import { Component, OnInit } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ActivatedRoute } from '@angular/router';
import { finalize } from 'rxjs';
import { ITask } from 'app/models/task.model';
import { TaskService } from 'app/services';
import { MainContentComponent } from 'app/components/common';

@Component({
  selector: 'app-task-page',
  standalone: true,
  imports: [MainContentComponent, MatProgressSpinnerModule],
  templateUrl: './task-page.component.html',
  styleUrl: './task-page.component.scss',
})
export class TaskPageComponent implements OnInit {
  private taskId = '';
  task: ITask | null = null;
  isLoading = false;
  error = '';

  constructor(private taskService: TaskService, private route: ActivatedRoute) {
    this.taskId = this.route.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.taskService
      .getTaskById(this.taskId)
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe((task) => {
        this.task = task;
      });
  }
}
