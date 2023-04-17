import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { ConfirmDialogData } from './confirm-dialog.model';

@Component({
  selector: 'lxs-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss'],
})
export class ConfirmDialogComponent {

  constructor(private dialog: MatDialogRef<ConfirmDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: ConfirmDialogData) {}

  onClickCancel() {
    this.dialog.close(false);
  }

  onClickDelete() {
    this.dialog.close(true);
  }
}
