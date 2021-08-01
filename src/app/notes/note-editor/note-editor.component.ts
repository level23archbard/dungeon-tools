import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BehaviorSubject, Subscription } from 'rxjs';
import { debounceTime, filter, map, switchMap } from 'rxjs/operators';

import { NotesService } from '../notes.service';

@Component({
  selector: 'lxs-note-editor',
  templateUrl: './note-editor.component.html',
  styleUrls: ['./note-editor.component.scss'],
})
export class NoteEditorComponent implements OnChanges, OnInit, OnDestroy {

  @Input() id?: string;
  @ViewChild('noteEditor') noteEditor?: CdkTextareaAutosize;
  private noteId = new BehaviorSubject<string | null>(null);
  noteControl = new FormControl('');
  isEditing = true;
  private subscriptions = new Subscription();

  constructor(private notes: NotesService) {}

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
        this.noteControl.setValue(value);
        setTimeout(() => {
          this.noteEditor?.resizeToFitContent(true);
        });
      }),
    );

    this.subscriptions.add(this.noteControl.valueChanges.pipe(
      map((value) => [this.noteId.value, value || ''] as [string | null, string]),
      debounceTime(200),
    ).subscribe(([id, text]) => {
      if (id) {
        this.notes.updateNoteValue(id, text);
      }
    }));
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  onClickEditing(): void {
    this.isEditing = !this.isEditing;
  }
}
