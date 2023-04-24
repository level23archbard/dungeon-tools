import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';

import { ConfirmDialogComponent } from './confirm-dialog.component';
import { ConfirmDialogData } from './confirm-dialog.model';

@Injectable({
  providedIn: 'root',
})
export class ConfirmDialogService {

  constructor(private dialog: MatDialog) {}

  open(data: ConfirmDialogData): Observable<boolean> {
    return this.dialog.open(ConfirmDialogComponent, { data }).afterClosed();
  }
}
