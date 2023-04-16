import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { IconsModule } from 'src/icons/icons.module';

import { SideListingComponent } from './side-listing.component';

@NgModule({
  declarations: [SideListingComponent],
  imports: [
    CommonModule,
    DragDropModule,
    IconsModule,
  ],
  exports: [SideListingComponent],
})
export class SideListingModule {}
