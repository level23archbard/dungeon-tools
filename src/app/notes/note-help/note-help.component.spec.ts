import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteHelpComponent } from './note-help.component';

describe('NoteHelpComponent', () => {
  let component: NoteHelpComponent;
  let fixture: ComponentFixture<NoteHelpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoteHelpComponent ],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NoteHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
