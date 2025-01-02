import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { Store } from '@ngrx/store';
import { AppStoreI } from './store/to-do-app.reducers';
import { ToDoActions } from './store/actions/to-do-app.actions';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  store = inject(Store<AppStoreI>);
  title = 'toDoApp';

  ngOnInit(): void {
    this.store.dispatch(ToDoActions.getInitialDate());
    // todo: create a resolver for this
    this.store.dispatch(ToDoActions.loadInitialTasks());
  }
}
