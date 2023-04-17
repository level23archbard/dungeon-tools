import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';

import { ConfirmDialogComponent } from './confirm-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    MatDialogModule,
  ],
  declarations: [
    ConfirmDialogComponent,
  ],
  exports: [ConfirmDialogComponent, MatDialogModule],
})
export class ConfirmDialogModule { }
