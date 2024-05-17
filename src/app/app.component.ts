import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { NgIf } from '@angular/common';
import { ITask } from './models/task.model';
import { TaskService } from './services/task.service';
import { ContentComponent, HeaderComponent } from './components';

@Component({
  selector: 'app-root',
  standalone: true,
  providers: [TaskService],
  imports: [
    RouterOutlet,
    HttpClientModule,
    NgIf,
    HeaderComponent,
    ContentComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  public tasks: ITask[] = [];
  public isLoading: boolean = false;
  public error: string = '';

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.isLoading = true;
    this.taskService.getTasks().subscribe(
      (tasksFromServer: ITask[]) => {
        this.tasks = tasksFromServer;
        this.isLoading = false;
      },
      (error) => {
        console.log(error);
        this.isLoading = false;
        this.error = error.message;
      }
    );
  }
}
