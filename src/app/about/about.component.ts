import { Component, OnInit } from '@angular/core';

import { WelcomeService } from '../welcome/welcome.service';

@Component({
  selector: 'lxs-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent implements OnInit {

  showFirstTime = false;

  constructor(private welcome: WelcomeService) {}

  ngOnInit(): void {
    this.welcome.checked.subscribe((isChecked) => {
      this.showFirstTime = !isChecked;
    });
  }
}
