import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideHeaderComponent } from './side-header.component';

describe('SideHeaderComponent', () => {
  let component: SideHeaderComponent;
  let fixture: ComponentFixture<SideHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SideHeaderComponent ],
    })
      .compileComponents();

    fixture = TestBed.createComponent(SideHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
