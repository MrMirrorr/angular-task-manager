import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
} from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { TaskService } from '../../services/task.service';
import { INewTask } from '../../models/task.model';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [
    HttpClientModule,
    FormsModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
  ],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.scss',
})
export class TaskFormComponent {
  public title: string = '';
  public description: string = '';

  constructor(private taskService: TaskService) {}

  onOkClick() {
    const newTask: INewTask = {
      title: this.title,
      description: this.description,
      complete: false,
    };

    this.taskService.createTask(newTask).subscribe(
      (newTask) => {
        console.log('Task created', newTask);
        // Здесь вы можете добавить код для обработки новой задачи
      },
      (error) => {
        console.error('Error creating task', error);
      }
    );
  }
}
