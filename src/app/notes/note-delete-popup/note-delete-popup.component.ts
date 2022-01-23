import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'lxs-note-delete-popup',
  templateUrl: './note-delete-popup.component.html',
  styleUrls: ['./note-delete-popup.component.scss'],
})
export class NoteDeletePopupComponent {

  constructor(private dialog: MatDialogRef<NoteDeletePopupComponent>) {}

  onClickCancel() {
    this.dialog.close(false);
  }

  onClickDelete() {
    this.dialog.close(true);
  }
}
