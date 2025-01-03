import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { debounceTime, filter, Subscription } from 'rxjs';

@Component({
  selector: 'app-actions',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './actions.component.html',
  styleUrl: './actions.component.scss',
})
export class ActionsComponent implements OnInit, OnDestroy {
  @Output()
  createTask = new EventEmitter<void>();
  @Output()
  searchTask = new EventEmitter<string>();

  form = new FormGroup({
    filter: new FormControl(''),
  });
  sub!: Subscription;

  ngOnInit(): void {
    this.sub = this.form.controls.filter.valueChanges
      .pipe(debounceTime(500))
      .subscribe((value) => {
        this.triggerSearchTask(value ?? '');
      });
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  addTask($event: Event) {
    $event.preventDefault();
    this.createTask.emit();
  }
  triggerSearchTask(value: string) {
    this.searchTask.emit(value);
  }
}
