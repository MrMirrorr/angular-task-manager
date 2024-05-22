import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { DialogComponent } from 'app/components/common';
import {
  TaskCardComponent,
  TaskFormComponent,
  TaskListComponent,
} from 'app/components/task';
import { TaskService } from 'app/services/task.service';

@NgModule({
  declarations: [TaskListComponent, TaskFormComponent, TaskCardComponent],
  imports: [
    TaskCardComponent,
    FormsModule,
    DialogComponent,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatCardModule,
    MatSlideToggleModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
  ],
  providers: [TaskService],
  exports: [TaskListComponent, TaskFormComponent],
})
export class TaskModule {}
