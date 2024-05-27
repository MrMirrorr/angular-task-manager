import { Component, OnInit } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ActivatedRoute } from '@angular/router';
import { delay } from 'rxjs';
import { ITask } from 'app/models/task.model';
import { TaskService } from 'app/services/task.service';

@Component({
  selector: 'app-task-page',
  standalone: true,
  imports: [MatProgressSpinnerModule],
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
      .pipe(delay(1000))
      .subscribe((task) => {
        this.task = task;
        this.isLoading = false;
      });
  }
}
