import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

import { ActionComponent } from './action/action.component';

@NgModule({
  imports: [
    CommonModule,
    MatIconModule,
    MatTooltipModule,
  ],
  declarations: [
    ActionComponent,
  ],
  exports: [ActionComponent],
})
export class LxsCommonModule { }
