import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { IconsModule } from 'src/icons/icons.module';
import { ConfirmDialogModule } from 'src/templates/confirm-dialog/confirm-dialog.module';
import { InscriptionModule } from 'src/templates/inscription/inscription.module';
import { SideHeaderModule } from 'src/templates/side-header/side-header.module';
import { SideListingModule } from 'src/templates/side-listing/side-listing.module';
import { SplitPanelsModule } from 'src/templates/split-panels/split-panels.module';

import { MapDisplayComponent } from './map-display/map-display.component';
import { MapPanelComponent } from './map-panel/map-panel.component';
import { MapTilePanelComponent } from './map-tile-panel/map-tile-panel.component';
import { MapsHelpComponent } from './maps-help/maps-help.component';
import { MapsListComponent } from './maps-list/maps-list.component';
import { MapsComponent } from './maps.component';

@NgModule({
  imports: [
    CommonModule,
    ConfirmDialogModule,
    IconsModule,
    InscriptionModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: '', component: MapsComponent },
      { path: ':id', component: MapsComponent },
      { path: ':id/:tileId', component: MapsComponent },
    ]),
    SideHeaderModule,
    SideListingModule,
    SplitPanelsModule,
  ],
  declarations: [
    MapDisplayComponent,
    MapPanelComponent,
    MapTilePanelComponent,
    MapsComponent,
    MapsHelpComponent,
    MapsListComponent,
  ],
})
export class MapsModule { }
