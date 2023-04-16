import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { InscriptionModule } from 'src/templates/inscription/inscription.module';
import { SideListingModule } from 'src/templates/side-listing/side-listing.module';
import { SplitPanelsModule } from 'src/templates/split-panels/split-panels.module';

import { MapDisplayComponent } from './map-display/map-display.component';
import { MapPanelComponent } from './map-panel/map-panel.component';
import { MapsHelpComponent } from './maps-help/maps-help.component';
import { MapsListComponent } from './maps-list/maps-list.component';
import { MapsComponent } from './maps.component';

@NgModule({
  imports: [
    CommonModule,
    InscriptionModule,
    RouterModule.forChild([
      { path: '', component: MapsComponent },
      { path: ':id', component: MapsComponent },
    ]),
    SideListingModule,
    SplitPanelsModule,
  ],
  declarations: [
    MapDisplayComponent,
    MapPanelComponent,
    MapsComponent,
    MapsHelpComponent,
    MapsListComponent,
  ],
})
export class MapsModule { }
