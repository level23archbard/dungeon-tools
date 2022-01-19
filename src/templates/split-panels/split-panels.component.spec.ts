import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SplitPanelsComponent } from './split-panels.component';

describe('SplitPanelsComponent', () => {
  let component: SplitPanelsComponent;
  let fixture: ComponentFixture<SplitPanelsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SplitPanelsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SplitPanelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
