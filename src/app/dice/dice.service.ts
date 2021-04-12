import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface Dice {
  name: string;
  size: number;
}

export interface DiceResult {
  dice: Dice;
  value: number;
  critical?: 'SUCCESS' | 'FAILURE';
}

@Injectable({ providedIn: 'root' })
export class DiceService {

  private getDice(size: number): Dice {
    return {
      name: `d${size}`,
      size,
    };
  }

  d20 = this.getDice(20);
  d4 = this.getDice(4);
  d6 = this.getDice(6);
  d8 = this.getDice(8);
  d10 = this.getDice(10);
  d12 = this.getDice(12);
  d100 = this.getDice(100);

  get standardDiceArray(): Dice[] {
    return [this.d4, this.d6, this.d8, this.d10, this.d12, this.d100, this.d20];
  }

  private roll(dice: Dice): number {
    return Math.ceil(Math.random() * dice.size);
  }

  private makeResult(dice: Dice, value: number): DiceResult {
    return {
      dice,
      value,
      critical: value === dice.size ? 'SUCCESS' : value === 1 ? 'FAILURE' : undefined,
    };
  }

  rollDice(dice: Dice): Observable<DiceResult> {
    return of(this.makeResult(dice, this.roll(dice)));
  }
}
