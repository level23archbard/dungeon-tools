import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotesHelpComponent } from './notes-help.component';

describe('NoteHelpComponent', () => {
  let component: NotesHelpComponent;
  let fixture: ComponentFixture<NotesHelpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotesHelpComponent ],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotesHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
