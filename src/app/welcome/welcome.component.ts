import { Component } from '@angular/core';

import { WelcomeService } from './welcome.service';

@Component({
  selector: 'lxs-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
})
export class WelcomeComponent {

  constructor(private welcome: WelcomeService) {}

  onAcceptClick(): void {
    this.welcome.check();
  }
}
