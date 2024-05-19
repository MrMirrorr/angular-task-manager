import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent, MainContentComponent } from './components/common';
import { TaskListComponent } from './components/task';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    MainContentComponent,
    TaskListComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {}
