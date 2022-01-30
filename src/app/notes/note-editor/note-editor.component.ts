import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';

import { LinkerService } from 'src/app/linker.service';
import { NotesService } from '../notes.service';

@Component({
  selector: 'lxs-note-editor',
  templateUrl: './note-editor.component.html',
  styleUrls: ['./note-editor.component.scss'],
})
export class NoteEditorComponent implements OnChanges, OnInit, OnDestroy {

  @Input() id?: string;
  private noteId = new BehaviorSubject<string | null>(null);
  private subscriptions = new Subscription();
  noteValue?: string;

  constructor(public linker: LinkerService, private notes: NotesService) {}

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
      }),
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
}
