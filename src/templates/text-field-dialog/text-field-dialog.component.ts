import { Component, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { TextFieldDialogData } from './text-field-dialog.model';

@Component({
  selector: 'lxs-text-field-dialog',
  templateUrl: './text-field-dialog.component.html',
  styleUrls: ['./text-field-dialog.component.scss'],
})
export class TextFieldDialogComponent {

  renamingControl = new FormControl('');

  constructor(private dialog: MatDialogRef<TextFieldDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: TextFieldDialogData) {
    this.renamingControl.setValue(this.data.currentValue);
  }

  onClickCancel() {
    this.dialog.close(undefined);
  }

  onClickSubmit() {
    this.dialog.close(this.renamingControl.value);
  }
}
