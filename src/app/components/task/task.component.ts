import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { Task } from '../../shared/interfaces/task.interface';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { DatePipe, NgClass, NgIf } from '@angular/common';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, NgClass, NgIf, DatePipe],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskComponent {
  @Input({ required: true }) task!: Task;

  @Output() deleteTask = new EventEmitter<number>();
  @Output() editTask = new EventEmitter<Task>();

  triggerDeleteTask(taskId: number) {
    this.deleteTask.emit(taskId);
  }
  triggerCompleteTask(task: Task) {
    task = { ...task, completed: !task.completed };
    this.editTask.emit(task);
  }
}
