import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WelcomeComponent } from './welcome.component';
import { WelcomeService } from './welcome.service';

describe('WelcomeComponent', () => {
  let component: WelcomeComponent;
  let fixture: ComponentFixture<WelcomeComponent>;
  let welcomeSpy: jasmine.SpyObj<WelcomeService>;

  beforeEach(async () => {
    welcomeSpy = jasmine.createSpyObj('WelcomeService', ['check']);
    await TestBed.configureTestingModule({
      declarations: [ WelcomeComponent ],
      providers: [{ provide: WelcomeService, useValue: welcomeSpy }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WelcomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call welcome check on accept click', () => {
    component.onAcceptClick();
    expect(welcomeSpy.check).toHaveBeenCalled();
  });
});
