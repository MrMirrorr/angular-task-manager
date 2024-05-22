import { Component, Inject, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { DialogComponent } from 'app/components/common';
import { TaskService } from 'app/services/task.service';
import { INewTask, ITask } from 'app/models/task.model';
import { IDialogData, TaskMode } from './types';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    DialogComponent,
  ],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.scss',
})
export class TaskFormComponent {
  public id: string = '';
  public title: string = '';
  public description: string = '';
  public complete: boolean = false;
  public mode: TaskMode = 'create';

  constructor(
    private taskService: TaskService,
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IDialogData
  ) {
    this.mode = data.mode;

    if (data.task && data.mode === 'edit') {
      this.id = data.task.id;
      this.title = data.task.title;
      this.description = data.task.description;
      this.complete = data.task.complete;
    }
  }

  onOkClick() {
    const newTask: INewTask = {
      title: this.title,
      description: this.description,
      complete: false,
    };

    const newTaskWithId: ITask = {
      id: this.id,
      title: this.title,
      description: this.description,
      complete: this.complete,
    };

    switch (this.mode) {
      case 'create':
        this.taskService.createTask(newTask).subscribe((newTask) => {
          console.log('Task created', newTask);
          this.dialogRef.close();
        });
        break;
      case 'edit':
        this.taskService.updateTask(newTaskWithId).subscribe(
          (newTask) => {
            console.log('Task created', newTask);
            this.dialogRef.close();
          },
          (error) => {
            console.error('Error editing task', error);
          }
        );
        break;
      default:
        break;
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
