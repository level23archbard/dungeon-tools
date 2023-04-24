import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';

import { TextFieldDialogComponent } from './text-field-dialog.component';
import { TextFieldDialogData } from './text-field-dialog.model';

@Injectable({
  providedIn: 'root',
})
export class TextFieldDialogService {

  constructor(private dialog: MatDialog) {}

  open(data: TextFieldDialogData): Observable<string | undefined> {
    return this.dialog.open(TextFieldDialogComponent, { data }).afterClosed();
  }
}
