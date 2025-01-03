import { Component, importProvidersFrom, inject } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Task } from '../../shared/interfaces/task.interface';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {
  MatNativeDateModule,
  provideNativeDateAdapter,
} from '@angular/material/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-create-task-modal',
  standalone: true,
  imports: [
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './create-task-modal.component.html',
  styleUrl: './create-task-modal.component.scss',
  providers: [provideNativeDateAdapter()],
})
export class CreateTaskModalComponent {
  public dialog = inject(MatDialog);
  public dialogRef =
    inject<MatDialogRef<CreateTaskModalComponent, Task | undefined>>(
      MatDialogRef
    );
  //Todo:Handle the dueDate Format
  form = new FormGroup({
    title: new FormControl<string>('', Validators.required),
    dueDate: new FormControl<Date | null>(
      { value: null, disabled: false },
      Validators.required
    ),
  });
  closeModal(): void {
    this.dialogRef.close();
  }

  addTask(): void {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }

    this.dialogRef.close({
      id: new Date().getTime(),
      title: this.form.value.title!,
      due_date: this.form.value.dueDate!,
      completed: false,
    });
  }
}
