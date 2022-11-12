import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject, Subscription } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';

import { LinkerService } from 'src/app/linker.service';
import { SettingsService } from 'src/app/settings.service';
import { NotesService } from '../notes.service';

@Component({
  selector: 'lxs-note-editor',
  templateUrl: './note-editor.component.html',
  styleUrls: ['./note-editor.component.scss'],
})
export class NoteEditorComponent implements OnChanges, OnInit, OnDestroy {

  @Input() id?: string;
  private noteId = new BehaviorSubject<string | null>(null);
  private selectedInvalidLink = new Subject<string>();
  private subscriptions = new Subscription();
  noteValue?: string;

  constructor(private router: Router, public linker: LinkerService, private notes: NotesService, private settings: SettingsService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.id) {
      this.noteId.next(changes.id.currentValue);
    }
  }

  ngOnInit(): void {
    this.subscriptions.add(
      this.noteId.pipe(
        filter((value) => !!value),
        switchMap((id) => this.notes.getCurrentNoteValue(id as string)),
      ).subscribe((value) => {
        this.noteValue = value;
      })
    );
    this.subscriptions.add(
      this.selectedInvalidLink.pipe(
        switchMap((link) => this.notes.addNoteEntry(link)),
      ).subscribe((entryId) => {
        this.settings.setSetting('notesSelectedId', entryId);
        this.router.navigate(['notes', entryId]);
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  onNoteChanged(newValue: string) {
    const id = this.noteId.value;
    if (id) {
      this.notes.updateNoteValue(id, newValue);
    }
  }

  onSelectedInvalidLink(link: string) {
    this.selectedInvalidLink.next(link);
  }
}
