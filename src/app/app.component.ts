import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent, MainContentComponent } from './components/common';
import { TaskFormComponent, TaskListComponent } from './components/task';
import { MenuStateService } from './services/menu-state.service';
import { MatDialog } from '@angular/material/dialog';

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
export class AppComponent implements OnInit {
  constructor(
    private readonly _menuStateService: MenuStateService,
    public dialog: MatDialog
  ) {}

  public ngOnInit() {
    this._menuStateService.menu$.next([
      { name: 'ADD', action: () => this.openDialog() },
    ]);
  }

  openDialog(): void {
    this.dialog.open(TaskFormComponent, {
      data: { mode: 'create' },
    });
  }
}
