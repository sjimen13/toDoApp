import { Component } from '@angular/core';
import { ActionsComponent } from '../../components/actions/actions.component';
import { TaskComponent } from '../../components/task/task.component';
import { Task } from '../../shared/interfaces/task.interface';
import { taskMocks } from '../../shared/mocks/task.mocks';

@Component({
  selector: 'app-to-do',
  standalone: true,
  imports: [ActionsComponent, TaskComponent],
  templateUrl: './to-do.component.html',
  styleUrl: './to-do.component.scss',
})
export class ToDoComponent {
  tasksList: Task[] = taskMocks;
}
