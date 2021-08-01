import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideListingComponent } from './side-listing.component';

describe('SideListingComponent', () => {
  let component: SideListingComponent;
  let fixture: ComponentFixture<SideListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SideListingComponent ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SideListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
