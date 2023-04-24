import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { IconsModule } from 'src/icons/icons.module';
import { ConfirmDialogModule } from 'src/templates/confirm-dialog/confirm-dialog.module';
import { InscriptionModule } from 'src/templates/inscription/inscription.module';
import { SideListingModule } from 'src/templates/side-listing/side-listing.module';
import { SplitPanelsModule } from 'src/templates/split-panels/split-panels.module';
import { TextFieldDialogModule } from 'src/templates/text-field-dialog/text-field-dialog.module';

import { NoteEditorComponent } from './note-editor/note-editor.component';
import { NotesHelpComponent } from './notes-help/notes-help.component';
import { NotesListComponent } from './notes-list/notes-list.component';
import { NotesComponent } from './notes.component';

@NgModule({
  imports: [
    CommonModule,
    ConfirmDialogModule,
    IconsModule,
    InscriptionModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: '', component: NotesComponent },
      { path: ':id', component: NotesComponent },
    ]),
    SideListingModule,
    SplitPanelsModule,
    TextFieldDialogModule,
  ],
  declarations: [
    NoteEditorComponent,
    NotesComponent,
    NotesHelpComponent,
    NotesListComponent,
  ],
})
export class NotesModule { }
