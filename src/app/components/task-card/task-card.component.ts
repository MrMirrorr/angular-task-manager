import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ITask } from '../../models/task.model';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-task-card',
  standalone: true,
  imports: [
    FormsModule,
    MatCardModule,
    MatSlideToggleModule,
    MatProgressBarModule,
  ],
  templateUrl: './task-card.component.html',
  styleUrl: './task-card.component.scss',
})
export class TaskCardComponent {
  @Input()
  public task: ITask | undefined;
  public isLoading: boolean = false;
  public isChecked: boolean = false;

  constructor(private taskService: TaskService) {}

  changeTaskStatus(newStatus: boolean) {
    this.isLoading = true;
    if (this.task) {
      this.taskService
        .updateTask({ ...this.task, complete: newStatus })
        .subscribe(
          (taskFromServer: ITask) => {
            this.task = taskFromServer;
            this.isLoading = false;
          },
          (error) => {
            console.log(error);
            this.isLoading = false;
          }
        );
    }
  }
}
