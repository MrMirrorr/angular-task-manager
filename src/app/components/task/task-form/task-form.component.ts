import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { TaskService } from '../../../services/task.service';
import { INewTask } from '../../../models/task.model';
import { DialogComponent } from '../../common/dialog/dialog.component';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-task-form',
  standalone: true,
  providers: [TaskService],
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
  public title: string = '';
  public description: string = '';

  constructor(
    private taskService: TaskService,
    public dialogRef: MatDialogRef<DialogComponent>
  ) {}

  onOkClick() {
    const newTask: INewTask = {
      title: this.title,
      description: this.description,
      complete: false,
    };

    this.taskService.createTask(newTask).subscribe(
      (newTask) => {
        console.log('Task created', newTask);
        this.dialogRef.close();
      },
      (error) => {
        console.error('Error creating task', error);
      }
    );
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
