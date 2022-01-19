import { TextFieldModule } from '@angular/cdk/text-field';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StorageModule } from '@level23archbard/storage-service';

import { IconsModule } from 'src/icons/icons.module';
import { SideListingModule } from 'src/templates/side-listing/side-listing.module';
import { SplitPanelsModule } from 'src/templates/split-panels/split-panels.module';
import { AboutComponent } from './about/about.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CharactersComponent } from './characters/characters.component';
import { DiceComponent } from './dice/dice.component';
import { E404Component } from './e404/e404.component';
import { HomeComponent } from './home/home.component';
import { NoteEditorComponent } from './notes/note-editor/note-editor.component';
import { NotesComponent } from './notes/notes.component';
import { WelcomeComponent } from './welcome/welcome.component';

@NgModule({
  declarations: [
    AboutComponent,
    AppComponent,
    CharactersComponent,
    DiceComponent,
    E404Component,
    HomeComponent,
    NoteEditorComponent,
    NotesComponent,
    WelcomeComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    StorageModule,
    TextFieldModule,
    ReactiveFormsModule,
    AppRoutingModule,
    IconsModule,
    SideListingModule,
    SplitPanelsModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
