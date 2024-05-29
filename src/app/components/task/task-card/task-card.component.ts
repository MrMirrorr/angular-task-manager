import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { finalize, tap } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import {
  MatSlideToggleChange,
  MatSlideToggleModule,
} from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDialog } from '@angular/material/dialog';
import { AlertService, TaskService } from 'app/services';
import { ITask } from 'app/models/task.model';
import { TaskFormComponent } from '../task-form/task-form.component';
import { IDialogData } from '../task-form/types';

@Component({
  selector: 'app-task-card',
  standalone: true,
  imports: [
    FormsModule,
    MatCardModule,
    MatSlideToggleModule,
    MatButtonModule,
    MatProgressBarModule,
  ],
  templateUrl: './task-card.component.html',
  styleUrl: './task-card.component.scss',
})
export class TaskCardComponent {
  @Input() public task!: ITask;
  public isLoading: boolean = false;

  constructor(
    private taskService: TaskService,
    private alertService: AlertService,
    public dialog: MatDialog
  ) {}

  preventNavigation(event: Event) {
    event.preventDefault();
    event.stopPropagation();
  }

  changeTaskStatus(event: MatSlideToggleChange) {
    this.taskService
      .updateTaskStatus({ ...this.task, complete: event.checked })
      .pipe(
        tap(() => (this.isLoading = true)),
        finalize(() => (this.isLoading = false))
      )
      .subscribe((taskFromServer) => {
        this.task = taskFromServer;
        this.alertService.showAlert(
          'Task status updated successfully',
          'success'
        );
      });
  }

  removeTask(event: Event) {
    this.preventNavigation(event);
    this.taskService
      .deleteTask(this.task.id)
      .pipe(
        tap(() => (this.isLoading = true)),
        finalize(() => (this.isLoading = false))
      )
      .subscribe(() => this.alertService.showAlert('Task deleted', 'success'));
  }

  openDialog(event: Event): void {
    this.preventNavigation(event);
    const data: IDialogData = { mode: 'edit', task: this.task };
    this.dialog.open<TaskFormComponent, IDialogData>(TaskFormComponent, {
      data,
    });
  }
}
