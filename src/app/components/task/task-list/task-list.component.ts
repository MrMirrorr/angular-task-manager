import { Component, OnInit } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ITask } from '../../../models/task.model';
import { TaskService } from '../../../services/task.service';
import { TaskCardComponent } from '../task-card/task-card.component';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [TaskCardComponent, MatProgressSpinnerModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss',
})
export class TaskListComponent implements OnInit {
  tasks: ITask[] = [];
  isLoading = false;
  error = '';

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.taskService.tasks$.subscribe((tasks) => {
      this.tasks = tasks;
    });

    this.isLoading = true;
    this.taskService.fetchTasks().subscribe(
      (tasks) => {
        this.tasks = tasks;
        this.isLoading = false;
        this.error = '';
      },
      (error) => {
        console.log(error);
        this.isLoading = false;
        this.error = error.message;
      }
    );
  }
}
