import { Component } from '@angular/core';

@Component({
  selector: 'app-loader',
  template: `
    <div class="main-container">
      <div class="box-animation">
        <span class="first-loader"></span>
        <span class="second-loader"></span>
      </div>
    </div>
  `,
  styleUrls: ['./loader2.component.scss'],
  standalone: true,
})
export class Loader2Component {
  constructor() {}
}
