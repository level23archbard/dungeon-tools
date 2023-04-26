import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';

import { IconsModule } from 'src/icons/icons.module';
import { LxsCommonModule } from 'src/templates/common/common.module';

import { TreeDialogComponent } from './tree-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    IconsModule,
    LxsCommonModule,
    MatDialogModule,
  ],
  declarations: [
    TreeDialogComponent,
  ],
})
export class TreeDialogModule { }
