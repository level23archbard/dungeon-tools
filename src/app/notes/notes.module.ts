import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';

import { IconsModule } from 'src/icons/icons.module';
import { InscriptionModule } from 'src/templates/inscription/inscription.module';
import { SideListingModule } from 'src/templates/side-listing/side-listing.module';
import { SplitPanelsModule } from 'src/templates/split-panels/split-panels.module';

import { NoteDeletePopupComponent } from './note-delete-popup/note-delete-popup.component';
import { NoteEditorComponent } from './note-editor/note-editor.component';
import { NotesHelpComponent } from './notes-help/notes-help.component';
import { NotesListComponent } from './notes-list/notes-list.component';
import { NotesComponent } from './notes.component';

@NgModule({
  imports: [
    CommonModule,
    IconsModule,
    InscriptionModule,
    MatDialogModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: '', component: NotesComponent },
      { path: ':id', component: NotesComponent },
    ]),
    SideListingModule,
    SplitPanelsModule,
  ],
  declarations: [
    NoteDeletePopupComponent,
    NoteEditorComponent,
    NotesComponent,
    NotesHelpComponent,
    NotesListComponent,
  ],
})
export class NotesModule { }
