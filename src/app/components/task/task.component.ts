import {
  ChangeDetectionStrategy,
  Component,
  Input,
  input,
} from '@angular/core';
import { Task } from '../../shared/interfaces/task.interface';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskComponent {
  @Input({ required: true }) task!: Task;
}
