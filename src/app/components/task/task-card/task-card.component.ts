import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import {
  MatSlideToggleChange,
  MatSlideToggleModule,
} from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ITask } from '../../../models/task.model';
import { TaskService } from '../../../services/task.service';
import { TaskFormComponent } from '../task-form/task-form.component';
import { MatDialog } from '@angular/material/dialog';

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

  constructor(private taskService: TaskService, public dialog: MatDialog) {}

  changeTaskStatus(event: MatSlideToggleChange) {
    this.isLoading = true;
    this.taskService
      .updateTask({ ...this.task, complete: event.checked })
      .subscribe(
        (taskFromServer: ITask) => {
          this.task = taskFromServer;
          this.isLoading = false;
        },
        (error) => {
          console.log(error);
          this.isLoading = false;
          event.source.checked = this.task.complete;
        }
      );
  }

  removeTask() {
    this.isLoading = true;
    this.taskService.deleteTask(this.task.id).subscribe(
      () => {
        this.isLoading = false;
      },
      (error) => {
        console.log(error);
        this.isLoading = false;
      }
    );
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(TaskFormComponent, {
      data: { mode: 'edit', task: this.task },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }
}
