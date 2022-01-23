import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteDeletePopupComponent } from './note-delete-popup.component';

describe('NoteDeletePopupComponent', () => {
  let component: NoteDeletePopupComponent;
  let fixture: ComponentFixture<NoteDeletePopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoteDeletePopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NoteDeletePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
