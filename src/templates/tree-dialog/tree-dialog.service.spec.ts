import { TestBed } from '@angular/core/testing';

import { TreeDialogService } from './tree-dialog.service';

describe('TreeDialogService', () => {
  let service: TreeDialogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TreeDialogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
