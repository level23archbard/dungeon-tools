import { TestBed } from '@angular/core/testing';

import { DiceService } from './dice.service';

describe('DiceService', () => {
  let service: DiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return dice result', () => {
    for (const dice of service.standardDiceArray) {
      service.rollDice(dice).subscribe((result) => {
        expect(result.dice).toEqual(dice);
        expect(result.value).toBeTruthy();
      });
    }
  });

  it('should return dice result with highest value as critical success', () => {
    const makeResult = service['makeResult']; // eslint-disable-line @typescript-eslint/dot-notation
    for (const dice of service.standardDiceArray) {
      expect(makeResult(dice, dice.size).critical).toBe('SUCCESS');
    }
  });

  it('should return dice result with lowest value as critical failure', () => {
    const makeResult = service['makeResult']; // eslint-disable-line @typescript-eslint/dot-notation
    for (const dice of service.standardDiceArray) {
      expect(makeResult(dice, 1).critical).toBe('FAILURE');
    }
  });
});
