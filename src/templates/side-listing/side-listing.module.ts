import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { IconsModule } from 'src/icons/icons.module';
import { SideHeaderModule } from 'src/templates/side-header/side-header.module';

import { SideListingComponent } from './side-listing.component';

@NgModule({
  declarations: [SideListingComponent],
  imports: [
    CommonModule,
    DragDropModule,
    IconsModule,
    SideHeaderModule,
  ],
  exports: [SideListingComponent],
})
export class SideListingModule {}
