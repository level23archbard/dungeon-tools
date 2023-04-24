import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { IconsModule } from 'src/icons/icons.module';
import { SideHeaderModule } from 'src/templates/side-header/side-header.module';

import { SideListComponent } from './side-list/side-list.component';
import { SideTreeComponent } from './side-tree/side-tree.component';

@NgModule({
  imports: [
    CommonModule,
    DragDropModule,
    IconsModule,
    SideHeaderModule,
  ],
  declarations: [SideListComponent, SideTreeComponent],
  exports: [SideListComponent, SideTreeComponent],
})
export class SideListingModule {}
