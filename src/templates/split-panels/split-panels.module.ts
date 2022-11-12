import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SplitPanelsComponent } from './split-panels.component';

@NgModule({
  declarations: [SplitPanelsComponent],
  imports: [
    CommonModule,
  ],
  exports: [SplitPanelsComponent],
})
export class SplitPanelsModule { }
