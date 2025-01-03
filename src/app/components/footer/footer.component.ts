import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [DatePipe],
  styleUrl: './footer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,

  template: `<footer class="footer">
    <p class="footer__text">{{ date | date }} © To do app</p>
  </footer> `,
})
export class FooterComponent {
  @Input({ required: true }) date!: Date | null;
}
