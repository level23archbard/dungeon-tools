import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatestWith, NEVER, Observable, of, Subscription, switchMap } from 'rxjs';

import { ConfirmDialogService } from 'src/templates/confirm-dialog/confirm-dialog.service';

import { SettingsService } from '../settings/settings.service';
import { NotesService } from './notes.service';

@Component({
  selector: 'lxs-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss'],
})
export class NotesComponent implements OnInit, OnDestroy {

  private subscriptions = new Subscription();
  activeNoteEntryId?: string;
  activeNoteEntryName?: string;
  isRenaming = false;
  renamingControl = new UntypedFormControl('');
  isDeleting = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dialog: ConfirmDialogService,
    private settings: SettingsService,
    private notes: NotesService,
  ) {}

  ngOnInit(): void {
    this.subscriptions.add(this.route.paramMap.pipe(
      switchMap((params) => {
        const id = params.get('id');
        this.activeNoteEntryId = id ?? undefined;
        if (id && id !== 'help') {
          return this.notes.getNoteEntry(id).pipe(combineLatestWith(of(id)));
        } else if (id === 'help') {
          this.settings.setSetting('notesSelectedId', null);
          this.router.navigate(['notes']);
          return NEVER;
        } else {
          return this.redirectToRecent();
        }
      }),
    ).subscribe(([entry, id]) => {
      if (entry) {
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
    }));
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  private redirectToRecent(): Observable<never> {
    const mostRecentId = this.settings.getCurrentSetting('notesSelectedId');
    if (!mostRecentId) { return NEVER; }
    return this.notes.getNoteEntry(mostRecentId).pipe(switchMap((entry) => {
      if (entry) {
        this.router.navigate(['notes', mostRecentId]);
      }
      return NEVER;
    }));
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
      this.dialog.open({ message: 'Are you sure you want to delete this note?' })
        .subscribe((confirm) => {
          if (confirm) {
            this.isDeleting = true;
            this.settings.setSetting('notesSelectedId', null);
            this.notes.deleteNoteEntry(this.activeNoteEntryId || '');
          }
        }),
    );
  }
}
