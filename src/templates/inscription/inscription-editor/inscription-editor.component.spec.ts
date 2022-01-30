import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InscriptionEditorComponent } from './inscription-editor.component';

describe('InscriptionEditorComponent', () => {
  let component: InscriptionEditorComponent;
  let fixture: ComponentFixture<InscriptionEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InscriptionEditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InscriptionEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
