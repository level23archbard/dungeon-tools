import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextFieldDialogComponent } from './text-field-dialog.component';

describe('TextFieldDialogComponent', () => {
  let component: TextFieldDialogComponent;
  let fixture: ComponentFixture<TextFieldDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TextFieldDialogComponent ],
    })
      .compileComponents();

    fixture = TestBed.createComponent(TextFieldDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
