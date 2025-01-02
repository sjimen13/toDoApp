import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/to-do/to-do.component').then((c) => c.ToDoComponent),
  },
];
