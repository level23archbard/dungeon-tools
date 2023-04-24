import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';

import { TextFieldDialogComponent } from './text-field-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    MatDialogModule,
    ReactiveFormsModule,
  ],
  declarations: [
    TextFieldDialogComponent,
  ],
})
export class TextFieldDialogModule { }
