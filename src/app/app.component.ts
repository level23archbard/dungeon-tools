import {
  trigger,
  style,
  animate,
  transition,
} from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NavigationEnd, Event, Router } from '@angular/router';
import { combineLatest } from 'rxjs';
import { filter } from 'rxjs/operators';

import { AppVersionService } from './app-version.service';
import { WelcomeComponent } from './welcome/welcome.component';
import { WelcomeService } from './welcome/welcome.service';

const WELCOME = 'welcome';

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
  ],
})
export class AppComponent implements OnInit {

  showSide: 'DICE' | 'SETTINGS' | null = null;
  showWelcome = false;

  constructor(private router: Router, private dialog: MatDialog, public appVersion: AppVersionService, private welcome: WelcomeService) {}

  ngOnInit(): void {
    combineLatest([
      this.router.events
        .pipe(
          filter((event: Event): event is NavigationEnd => event instanceof NavigationEnd),
        ),
      this.welcome.checked,
    ]).subscribe(([navigation, isChecked]) => {
      this.updateWelcomePopup(navigation, isChecked);
    });
  }

  updateWelcomePopup(navigation: NavigationEnd, isChecked: boolean): void {
    if (!isChecked && navigation.urlAfterRedirects !== '/about') {
      this.dialog.open(WelcomeComponent, {
        id: WELCOME,
      });
    } else {
      this.dialog.getDialogById(WELCOME)?.close();
    }
  }

  onClickDice(): void {
    this.showSide = 'DICE';
  }

  onClickSettings(): void {
    this.showSide = 'SETTINGS';
  }

  onSideClose(): void {
    this.showSide = null;
  }
}
