import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, Subscription } from 'rxjs';

import { SettingsService } from '../settings.service';
import { NoteDeletePopupComponent } from './note-delete-popup/note-delete-popup.component';
import { NoteEntry, NotesService } from './notes.service';

@Component({
  selector: 'lxs-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss'],
})
export class NotesComponent implements OnInit, OnDestroy {

  private subscriptions = new Subscription();
  noteEntries?: NoteEntry[];
  activeNoteEntryId?: string;
  activeNoteEntryName?: string;
  isRenaming = false;
  renamingControl = new UntypedFormControl('');
  isDeleting = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private settings: SettingsService,
    private notes: NotesService,
  ) {}

  ngOnInit(): void {
    this.subscriptions.add(combineLatest([this.route.paramMap, this.notes.noteEntriesList]).subscribe(([params, entries]) => {
      this.noteEntries = entries;
      const id = params.get('id');
      if (id) {
        const entry = entries.find((e) => e.id === id);
        if (entry) {
          this.activeNoteEntryId = id;
          this.activeNoteEntryName = entry.name;
          if (!this.isRenaming) {
            this.renamingControl.setValue(entry.name);
          }
        } else if (this.isDeleting) {
          this.isDeleting = false;
          this.router.navigate(['notes']);
        } else {
          this.router.navigate(['notes-not-found', id]);
        }
        this.activeNoteEntryId = id;
      } else {
        const mostRecentId = this.settings.getCurrentSetting('notesSelectedId');
        if (mostRecentId && entries.some((entry) => entry.id === mostRecentId)) {
          this.router.navigate(['notes', mostRecentId]);
        }
      }
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

  onClickRename(): void {
    this.isRenaming = true;
  }

  onClickRenameCancel(): void {
    this.isRenaming = false;
    this.renamingControl.setValue(this.activeNoteEntryName);
  }

  onClickRenameSave(): void {
    this.isRenaming = false;
    this.notes.editNoteEntry(this.activeNoteEntryId || '', (noteEntry) => {
      noteEntry.name = this.renamingControl.value;
      return noteEntry;
    });
  }

  onClickDelete(): void {
    this.subscriptions.add(
      this.dialog.open(NoteDeletePopupComponent).afterClosed().subscribe((confirm) => {
        if (confirm) {
          this.isDeleting = true;
          this.settings.setSetting('notesSelectedId', null);
          this.notes.deleteNoteEntry(this.activeNoteEntryId || '');
        }
      }),
    );
  }
}
