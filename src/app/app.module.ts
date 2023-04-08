import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StorageModule } from '@level23archbard/storage-service';

import { IconsModule } from 'src/icons/icons.module';
import { InscriptionModule } from 'src/templates/inscription/inscription.module';
import { SideListingModule } from 'src/templates/side-listing/side-listing.module';
import { SplitPanelsModule } from 'src/templates/split-panels/split-panels.module';

import { AboutComponent } from './about/about.component';
import { AppHeaderComponent } from './app-header/app-header.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CharactersComponent } from './characters/characters.component';
import { DiceComponent } from './dice/dice.component';
import { E404Component } from './e404/e404.component';
import { HomeComponent } from './home/home.component';
import { MapsComponent } from './maps/maps.component';
import { NoteDeletePopupComponent } from './notes/note-delete-popup/note-delete-popup.component';
import { NoteEditorComponent } from './notes/note-editor/note-editor.component';
import { NoteHelpComponent } from './notes/note-help/note-help.component';
import { NotesComponent } from './notes/notes.component';
import { SettingsComponent } from './settings/settings.component';
import { WelcomeComponent } from './welcome/welcome.component';

@NgModule({
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    IconsModule,
    InscriptionModule,
    MatDialogModule,
    ReactiveFormsModule,
    SideListingModule,
    SplitPanelsModule,
    StorageModule,
  ],
  declarations: [
    AboutComponent,
    AppComponent,
    AppHeaderComponent,
    CharactersComponent,
    DiceComponent,
    E404Component,
    HomeComponent,
    MapsComponent,
    NoteDeletePopupComponent,
    NoteEditorComponent,
    NoteHelpComponent,
    NotesComponent,
    SettingsComponent,
    WelcomeComponent,
  ],
  providers: [
    {
      provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {
        closeOnNavigation: true,
        disableClose: true,
        hasBackdrop: true,
        panelClass: 'lxs-dialog-card',
      },
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
