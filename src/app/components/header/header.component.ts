import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  template: `<header class="header">
    <h1 class="header__title">🌴 My todo app 🏝️</h1>
  </header>`,
  styleUrl: './header.component.scss',
})
export class HeaderComponent {}
