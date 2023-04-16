import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SideListingModule } from 'src/templates/side-listing/side-listing.module';
import { SplitPanelsModule } from 'src/templates/split-panels/split-panels.module';

import { CharactersComponent } from './characters.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: CharactersComponent },
    ]),
    SideListingModule,
    SplitPanelsModule,
  ],
  declarations: [
    CharactersComponent,
  ],
})
export class CharactersModule { }
