import {
  trigger,
  style,
  animate,
  transition,
} from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Event, Router } from '@angular/router';
import { combineLatest } from 'rxjs';
import { filter } from 'rxjs/operators';

import { WelcomeService } from './welcome/welcome.service';

@Component({
  selector: 'lxs-dungeon-tools',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('showSideTrigger', [
      transition(':enter', [
        style({ transform: 'translateX(100%)' }),
        animate('200ms ease-in', style({ transform: 'translateX(0)' })),
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({ transform: 'translateX(100%)' })),
      ]),
    ]),
    trigger('showWelcomeTrigger', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('400ms ease-in', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({ opacity: 0 })),
      ]),
    ]),
  ],
})
export class AppComponent implements OnInit {

  showSide: 'DICE' | null = null;
  showWelcome = false;

  constructor(private router: Router, private welcome: WelcomeService) {}

  ngOnInit(): void {
    combineLatest([
      this.router.events
        .pipe(
          filter((event: Event): event is NavigationEnd => event instanceof NavigationEnd),
        ),
      this.welcome.checked,
    ]).subscribe(([navigation, isChecked]) => {
      this.showWelcome = !isChecked && navigation.urlAfterRedirects !== '/about';
    });
  }

  onClickDice(): void {
    this.showSide = 'DICE';
  }

  onDiceClose(): void {
    this.showSide = null;
  }
}
