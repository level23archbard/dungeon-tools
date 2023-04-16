import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapsHelpComponent } from './maps-help.component';

describe('MapsHelpComponent', () => {
  let component: MapsHelpComponent;
  let fixture: ComponentFixture<MapsHelpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MapsHelpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MapsHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
