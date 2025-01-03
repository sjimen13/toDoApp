import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { Store } from '@ngrx/store';
import { AppStoreI } from './store/reducers/to-do-app.reducers';
import { ToDoActions } from './store/actions/to-do-app.actions';
import { AsyncPipe, NgIf } from '@angular/common';
import { selectDate, selectLoading } from './store/to-do-app.selectors';
import { first } from 'rxjs';
import { Loader2Component } from './shared/components/loader/loader2.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
    AsyncPipe,
    Loader2Component,
    NgIf,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  store = inject(Store<AppStoreI>);
  title = 'toDoApp';
  today$ = this.store.select(selectDate).pipe(first((date) => date !== null));
  isLoading$ = this.store.select(selectLoading);
  ngOnInit(): void {
    this.store.dispatch(ToDoActions.getInitialDate());
    // todo: create a resolver for this
    this.store.dispatch(ToDoActions.loadInitialTasks());
  }
}
