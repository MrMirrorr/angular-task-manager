import { Component, Input } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TaskCardComponent } from '../task-card/task-card.component';
import { ITask } from '../../models/task.model';

@Component({
  selector: 'app-content',
  standalone: true,
  imports: [TaskCardComponent, MatProgressSpinnerModule],
  templateUrl: './content.component.html',
  styleUrl: './content.component.scss',
})
export class ContentComponent {
  @Input() public tasks: ITask[] = [];
  @Input() public isLoading: boolean = false;
  @Input() public error: string = '';
}
