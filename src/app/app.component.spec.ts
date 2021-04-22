import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router, Event, NavigationStart, NavigationEnd } from '@angular/router';
import { Subject } from 'rxjs';

import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  const mockRouter = {
    events: new Subject<Event>(),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      providers: [
        { provide: Router, useValue: mockRouter },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should change showSide state on button presses', () => {
    expect(component.showSide).toBeNull();
    component.onClickDice();
    expect(component.showSide).toBe('DICE');
    component.onDiceClose();
    expect(component.showSide).toBeNull();
  });

  it('should show and hide welcome based on url', () => {
    // Before any router events trigger, showWelcome should be false.
    expect(component.showWelcome).toBeFalse();
    // Unrelated navigation events should cause no changes.
    mockRouter.events.next(new NavigationStart(1, ''));
    expect(component.showWelcome).toBeFalse();
    // Navigation event should cause showWelcome to trigger.
    mockRouter.events.next(new NavigationEnd(1, '', ''));
    expect(component.showWelcome).toBeTrue();
    // Navigation event to /about should cause showWelcome to hide.
    mockRouter.events.next(new NavigationEnd(1, '/about', '/about'));
    expect(component.showWelcome).toBeFalse();
  });
});
