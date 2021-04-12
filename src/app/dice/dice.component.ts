import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { Dice, DiceResult, DiceService } from './dice.service';

@Component({
  selector: 'lxs-dice',
  templateUrl: './dice.component.html',
  styleUrls: ['./dice.component.scss'],
})
export class DiceComponent implements OnInit {

  @Output() closeEvent = new EventEmitter<void>();

  dice: Dice[] = [];
  activeResult: DiceResult | null = null;

  constructor(private diceService: DiceService) {}

  ngOnInit(): void {
    this.dice = this.diceService.standardDiceArray;
  }

  onClickClose(): void {
    this.closeEvent.emit();
  }

  onClickDice(dice: Dice): void {
    this.diceService.rollDice(dice).subscribe((result) => {
      this.activeResult = result;
    });
  }
}
