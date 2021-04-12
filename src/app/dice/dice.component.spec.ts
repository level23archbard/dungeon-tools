import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiceComponent } from './dice.component';

describe('DiceComponent', () => {
  let component: DiceComponent;
  let fixture: ComponentFixture<DiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiceComponent ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should respond to close button', () => {
    let didCall = false;
    component.closeEvent.subscribe(() => {
      didCall = true;
    });
    component.onClickClose();
    expect(didCall).toBeTrue();
  });

  it('should respond to dice click', () => {
    expect(component.activeResult).toBeFalsy();
    component.onClickDice(component.dice[0]);
    expect(component.activeResult).toBeTruthy();
  });
});
