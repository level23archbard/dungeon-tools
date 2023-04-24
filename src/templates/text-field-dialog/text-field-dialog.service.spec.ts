import { TestBed } from '@angular/core/testing';

import { TextFieldDialogService } from './text-field-dialog.service';

describe('TextFieldDialogService', () => {
  let service: TextFieldDialogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TextFieldDialogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
