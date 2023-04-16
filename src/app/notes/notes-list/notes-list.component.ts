import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { SettingsService } from 'src/app/settings/settings.service';

import { NoteEntry } from '../notes.model';
import { NotesService } from '../notes.service';

@Component({
  selector: 'lxs-notes-list',
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.scss'],
})
export class NotesListComponent implements OnInit, OnDestroy {

  @Input() activeNoteEntryId?: string;

  private subscriptions = new Subscription();
  noteEntries?: NoteEntry[];

  constructor(
    private router: Router,
    private settings: SettingsService,
    private notes: NotesService,
  ) {}

  ngOnInit(): void {
    this.subscriptions.add(this.notes.noteEntriesList.subscribe((noteEntries) => {
      this.noteEntries = noteEntries;
    }));
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  onClickAddNoteEntry(): void {
    this.subscriptions.add(
      this.notes.addNoteEntry().subscribe((entryId) => {
        this.settings.setSetting('notesSelectedId', entryId);
        this.router.navigate(['notes', entryId]);
      }),
    );
  }

  onClickAboutNotes(): void {
    this.settings.setSetting('notesSelectedId', null);
    this.router.navigate(['notes']);
  }

  onClickNoteEntry(entryId: string): void {
    if (entryId !== this.activeNoteEntryId) {
      this.settings.setSetting('notesSelectedId', entryId);
      this.router.navigate(['notes', entryId]);
    }
  }

  onClickMoveNoteEntry(movement: { from: number; to: number }): void {
    this.notes.moveNoteEntry(movement.from, movement.to);
  }
}
