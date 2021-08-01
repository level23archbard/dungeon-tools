import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { WelcomeService } from '../welcome/welcome.service';

@Component({
  selector: 'lxs-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent implements OnInit, OnDestroy {

  private subscriptions = new Subscription();
  showFirstTime = false;

  constructor(private welcome: WelcomeService) {}

  ngOnInit(): void {
    this.subscriptions.add(this.welcome.checked.subscribe((isChecked) => {
      this.showFirstTime = !isChecked;
    }));
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
