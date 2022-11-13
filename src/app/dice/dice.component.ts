import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { delay, Observable, of, Subject, Subscription, switchMap, tap } from 'rxjs';

import { Dice, DiceResult, DiceService } from './dice.service';

@Component({
  selector: 'lxs-dice',
  templateUrl: './dice.component.html',
  styleUrls: ['./dice.component.scss'],
})
export class DiceComponent implements OnInit, OnDestroy {

  @Output() closeEvent = new EventEmitter<void>();
  private subscriptions = new Subscription();
  private diceRoll = new Subject<Dice>();
  dice: Dice[] = [];
  activeResult: DiceResult | null = null;
  rollingText = '';

  constructor(private diceService: DiceService) {}

  ngOnInit(): void {
    this.dice = this.diceService.standardDiceArray;

    this.subscriptions.add(
      this.diceRoll.pipe(
        switchMap((dice) => this.diceService.rollDice(dice)),
        switchMap((result) => this.simulateRoll(result)),
      ).subscribe((result) => {
        this.activeResult = result;
        this.rollingText = '';
      }),
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  onClickClose(): void {
    this.closeEvent.emit();
  }

  onClickDice(dice: Dice): void {
    this.diceRoll.next(dice);
  }

  private simulateRoll(result: DiceResult): Observable<DiceResult> {
    return of(result).pipe(
      tap(() => {
        this.activeResult = null;
        this.rollingText = 'Rolling';
      }),
      delay(50),
      tap(() => {
        this.rollingText = 'Rolling.';
      }),
      delay(50),
      tap(() => {
        this.rollingText = 'Rolling..';
      }),
      delay(50),
      tap(() => {
        this.rollingText = 'Rolling...';
      }),
      delay(50),
    );
  }
}
