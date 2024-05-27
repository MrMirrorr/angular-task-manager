import { AsyncPipe, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MenuStateService } from 'app/services/menu-state.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatButtonModule, AsyncPipe, NgFor, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  public title = 'Angular task manager';
  public menu$ = this._menuStateService.menu$;

  constructor(private readonly _menuStateService: MenuStateService) {}
}

export interface IAction {
  name: string;
  action: any;
}
