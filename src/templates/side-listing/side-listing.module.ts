import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { IconsModule } from 'src/icons/icons.module';

import { SideListingComponent } from './side-listing.component';

@NgModule({
  declarations: [SideListingComponent],
  imports: [
    CommonModule,
    IconsModule,
  ],
  exports: [SideListingComponent],
})
export class SideListingModule {}
