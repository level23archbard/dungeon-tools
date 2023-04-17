import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { IconsModule } from 'src/icons/icons.module';

import { SideHeaderComponent } from './side-header.component';

@NgModule({
  imports: [
    CommonModule,
    IconsModule,
  ],
  declarations: [SideHeaderComponent],
  exports: [SideHeaderComponent],
})
export class SideHeaderModule {}
