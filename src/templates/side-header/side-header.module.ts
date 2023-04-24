import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { IconsModule } from 'src/icons/icons.module';

import { LxsCommonModule } from '../common/common.module';
import { SideHeaderComponent } from './side-header.component';
import {
  SideHeaderLabelDirective,
  SideHeaderLeftDirective,
  SideHeaderRightDirective,
  SideHeaderToolbarDirective,
} from './side-header.directive';

@NgModule({
  imports: [
    CommonModule,
    IconsModule,
    LxsCommonModule,
  ],
  declarations: [
    SideHeaderComponent,
    SideHeaderLabelDirective,
    SideHeaderLeftDirective,
    SideHeaderRightDirective,
    SideHeaderToolbarDirective,
  ],
  exports: [
    LxsCommonModule,
    SideHeaderComponent,
    SideHeaderLabelDirective,
    SideHeaderLeftDirective,
    SideHeaderRightDirective,
    SideHeaderToolbarDirective,
  ],
})
export class SideHeaderModule {}
