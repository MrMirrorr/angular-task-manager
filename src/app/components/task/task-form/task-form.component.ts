import { Component, Inject } from '@angular/core';
import {
  FormControl,
  FormsModule,
  Validators,
  ReactiveFormsModule,
  FormGroupDirective,
  NgForm,
  FormBuilder,
  FormGroup,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { DialogComponent } from 'app/components/common';
import { TaskService } from 'app/services/task.service';
import { INewTask, ITask } from 'app/models/task.model';
import { IDialogData, TaskMode } from './types';
import { ErrorStateMatcher } from '@angular/material/core';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    DialogComponent,
    NgIf,
  ],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.scss',
})
export class TaskFormComponent {
  id: string = '';
  complete: boolean = false;
  mode: TaskMode = 'create';
  matcher = new MyErrorStateMatcher();
  taskForm!: FormGroup;

  constructor(
    private taskService: TaskService,
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IDialogData,
    private fb: FormBuilder
  ) {
    this.mode = data.mode;

    this.taskForm = this.fb.group({
      title: [
        this.mode === 'edit' ? data.task?.title : '',
        [Validators.required],
      ],
      description: [
        this.mode === 'edit' ? data.task?.description : '',
        [Validators.required],
      ],
    });

    if (data.task && this.mode === 'edit') {
      this.id = data.task.id;
      this.complete = data.task.complete;
    }
  }

  get title() {
    return this.taskForm.get('title');
  }

  get description() {
    return this.taskForm.get('description');
  }

  onOkClick() {
    this.taskForm.markAllAsTouched();

    if (!this.title?.valid || !this.description?.valid) {
      console.error('Form is not valid');
      return;
    }

    const newTask: INewTask = {
      title: this.title.value || '',
      description: this.description.value || '',
      complete: false,
    };

    const newTaskWithId: ITask = {
      id: this.id,
      title: this.title.value || '',
      description: this.description.value || '',
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

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}
