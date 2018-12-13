import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: [`
    .blueBg{ background-color: blue; color: white; }
  `]
})
export class AppComponent {

  showGreeting = false;
  clickHistory = [];

  constructor() {

  }

  onToggleDisplay() {
    this.showGreeting = !this.showGreeting;
    this.clickHistory.push(`Click #${this.clickHistory.length + 1} occurred at ${Date.now()}`);
  }
}
