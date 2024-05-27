import { Routes } from '@angular/router';
import { TaskPageComponent } from './pages/task-page/task-page.component';
import { TaskListPageComponent } from './pages/task-list-page/task-list-page.component';

export const routes: Routes = [
  {
    path: '',
    component: TaskListPageComponent,
  },
  {
    path: 'task/:id',
    component: TaskPageComponent,
  },
];
