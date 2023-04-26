import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';

import { TreeHierarchy } from 'src/common/types';

import { TreeDialogComponent } from './tree-dialog.component';
import { TreeDialogData } from './tree-dialog.model';

@Injectable({
  providedIn: 'root',
})
export class TreeDialogService {

  constructor(private dialog: MatDialog) {}

  open(data: TreeDialogData): Observable<TreeHierarchy | undefined> {
    return this.dialog.open(TreeDialogComponent, { data }).afterClosed();
  }
}
