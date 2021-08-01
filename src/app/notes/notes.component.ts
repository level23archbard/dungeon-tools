import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, Subscription } from 'rxjs';

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
  renamingControl = new FormControl('');
  isDeleting = false;

  constructor(private route: ActivatedRoute, private router: Router, private notes: NotesService) {}

  ngOnInit(): void {
    let firstTime = true;
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
        if (entries.length) {
          this.router.navigate(['notes', entries[0].id]);
        } else if (firstTime) {
          this.notes.addNoteEntry();
        }
      }
      firstTime = false;
    }));
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  onClickAddNoteEntry(): void {
    this.notes.addNoteEntry();
  }

  onClickNoteEntry(entry: NoteEntry): void {
    if (entry.id !== this.activeNoteEntryId) {
      this.router.navigate(['notes', entry.id]);
    }
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
    this.isDeleting = true;
    this.notes.deleteNoteEntry(this.activeNoteEntryId || '');
  }
}
