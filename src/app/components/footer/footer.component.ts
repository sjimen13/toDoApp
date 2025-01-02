import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  template: `<footer class="footer">
    <p class="footer__text">© 2021 To do app</p>
  </footer> `,
  styleUrl: './footer.component.scss',
})
export class FooterComponent {}
