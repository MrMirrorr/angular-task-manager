import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { TaskService } from '../../../services/task.service';
import { INewTask, ITask } from '../../../models/task.model';
import { DialogComponent } from '../../common/dialog/dialog.component';
import { TaskMode } from './types';

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
export class TaskFormComponent implements OnInit {
  public title: string = '';
  public description: string = '';
  @Input() public mode: TaskMode = 'create';

  constructor(
    private taskService: TaskService,
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { mode: TaskMode; task?: ITask }
  ) {
    this.mode = data.mode;

    if (data.task && data.mode === 'edit') {
      this.title = data.task.title;
      this.description = data.task.description;
    }
  }

  ngOnInit() {
    if (this.mode === 'edit') {
      console.log('Editing task');
    } else {
      console.log('Creating task');
    }
  }

  onOkClick() {
    const newTask: INewTask = {
      title: this.title,
      description: this.description,
      complete: false,
    };

    if (this.mode === 'edit') {
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
