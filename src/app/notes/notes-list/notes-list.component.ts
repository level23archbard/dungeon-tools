import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { combineLatestWith, of, Subject, Subscription, switchMap } from 'rxjs';

import { SettingsService } from 'src/app/settings/settings.service';
import { TreeGroup } from 'src/common/types';
import { ConfirmDialogService } from 'src/templates/confirm-dialog/confirm-dialog.service';
import { SideTreeAddEvent, SideTreeMoveEvent } from 'src/templates/side-listing/side-tree/side-tree.component';
import { TextFieldDialogService } from 'src/templates/text-field-dialog/text-field-dialog.service';

import { NoteStore } from '../notes.model';
import { NotesService } from '../notes.service';

@Component({
  selector: 'lxs-notes-list',
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.scss'],
})
export class NotesListComponent implements OnInit, OnDestroy {

  @Input() activeNoteEntryId?: string;

  private subscriptions = new Subscription();
  noteStore?: NoteStore;

  renameGroupSubject = new Subject<TreeGroup>();
  deleteGroupSubject = new Subject<TreeGroup>();

  constructor(
    private router: Router,
    private confirmDialog: ConfirmDialogService,
    private textFieldDialog: TextFieldDialogService,
    private settings: SettingsService,
    private notes: NotesService,
  ) {}

  ngOnInit(): void {
    this.subscriptions.add(this.notes.noteStore.subscribe((noteStore) => {
      this.noteStore = noteStore;
    }));
    this.subscriptions.add(this.renameGroupSubject.pipe(
      switchMap((group) =>
        of(group.id).pipe(combineLatestWith(this.textFieldDialog.open({ message: 'Rename Group:', currentValue: group.name }))),
      ),
    ).subscribe(([groupId, newName]) => {
      if (newName !== undefined) {
        this.notes.editNoteGroup(groupId, (group) => ({ ...group, name: newName }));
      }
    }));
    this.subscriptions.add(this.deleteGroupSubject.pipe(
      switchMap((group) =>
        of(group.id).pipe(
          combineLatestWith(this.confirmDialog.open({
            message: 'Are you sure you want to delete this group? All entries will be added to the end of the parent.',
          })),
        ),
      ),
    ).subscribe(([groupId, confirm]) => {
      if (confirm) {
        this.notes.deleteNoteGroup(groupId);
      }
    }));
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  onClickAddNoteEntry(event: SideTreeAddEvent): void {
    if (event.type === 'entry') {
      const entryId = this.notes.addNoteEntry(event.hierarchy);
      this.settings.setSetting('notesSelectedId', entryId);
      this.router.navigate(['notes', entryId]);
    } else {
      this.notes.addNoteGroup(event.hierarchy);
    }
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

  onClickMoveNoteEntry(event: SideTreeMoveEvent): void {
    this.notes.moveNoteEntry(event.hierarchy, event.from, event.to);
  }
}
