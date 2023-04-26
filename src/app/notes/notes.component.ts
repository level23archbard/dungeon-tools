import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatestWith, NEVER, Observable, of, Subject, Subscription, switchMap, take } from 'rxjs';

import { byId } from 'src/common/id.utils';
import { findHierarchyInTree } from 'src/common/tree.utils';
import { ConfirmDialogService } from 'src/templates/confirm-dialog/confirm-dialog.service';
import { TreeDialogService } from 'src/templates/tree-dialog/tree-dialog.service';

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
  renamingControl = new FormControl('', { nonNullable: true });
  isDeleting = false;

  moveNoteSubject = new Subject<void>();
  deleteNoteSubject = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private confirmDialog: ConfirmDialogService,
    private treeDialog: TreeDialogService,
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
    this.subscriptions.add(this.moveNoteSubject.pipe(
      switchMap(() => this.notes.noteStore.pipe(take(1))),
      switchMap((noteStore) => {
        if (!this.activeNoteEntryId) { return NEVER; }
        const hierarchy = findHierarchyInTree(noteStore, byId(this.activeNoteEntryId));
        if (!hierarchy) { return NEVER; }
        return this.treeDialog.open({ message: 'Select Destination:', tree: noteStore, currentHierarchy: hierarchy, rootLabel: 'Notes' });
      }),
    ).subscribe((newHierarchy) => {
      if (this.activeNoteEntryId && newHierarchy) {
        this.notes.moveNoteEntryToHierarchy(this.activeNoteEntryId, newHierarchy);
      }
    }));
    this.subscriptions.add(this.deleteNoteSubject.pipe(
      switchMap(() =>
        this.confirmDialog.open({ message: 'Are you sure you want to delete this note?' }),
      ),
    ).subscribe((confirm) => {
      if (confirm) {
        this.isDeleting = true;
        this.settings.setSetting('notesSelectedId', null);
        this.notes.deleteNoteEntry(this.activeNoteEntryId || '');
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
    this.renamingControl.setValue(this.activeNoteEntryName || '');
  }

  onClickRenameSave(): void {
    this.isRenaming = false;
    this.notes.editNoteEntry(this.activeNoteEntryId || '', (noteEntry) => {
      noteEntry.name = this.renamingControl.value;
      return noteEntry;
    });
  }
}
