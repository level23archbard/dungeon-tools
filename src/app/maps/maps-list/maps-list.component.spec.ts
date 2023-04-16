import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapsListComponent } from './maps-list.component';

describe('MapsListComponent', () => {
  let component: MapsListComponent;
  let fixture: ComponentFixture<MapsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MapsListComponent ],
    })
      .compileComponents();

    fixture = TestBed.createComponent(MapsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
