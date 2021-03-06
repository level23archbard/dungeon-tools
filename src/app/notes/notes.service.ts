import { Injectable } from '@angular/core';
import { StorageKey, StorageService } from '@level23archbard/storage-service';
import { AsyncSubject, Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

import { IdService } from '../id.service';

export interface NoteEntry {
  id: string;
  name: string;
  link: string;
}

@Injectable({
  providedIn: 'root',
})
export class NotesService {

  private noteEntries: StorageKey<NoteEntry[]>;

  constructor(private id: IdService, private storage: StorageService) {
    this.noteEntries = this.storage.jsonKey('noteEntries');
  }

  get noteEntriesList(): Observable<NoteEntry[]> {
    return this.noteEntries.get().pipe(
      map((data) => data || []),
    );
  }

  private operateOnNoteEntries<T>(operation: (noteEntries: NoteEntry[]) => T): Observable<T> {
    const returnSubject = new AsyncSubject<T>();
    this.noteEntries.get().pipe(
      take(1),
      map((data) => {
        const noteEntries = data || [];
        const returnValue = operation(noteEntries);
        this.noteEntries.set(noteEntries);
        return returnValue;
      }),
    ).subscribe(returnSubject);
    return returnSubject.asObservable();
  }

  addNoteEntry(): Observable<string> {
    return this.operateOnNoteEntries((noteEntries) => {
      const id = this.id.generate();
      noteEntries.unshift({
        id,
        name: 'New Note',
        link: '',
      });
      return id;
    });
  }

  editNoteEntry(id: string, modify: (noteEntry: NoteEntry) => NoteEntry): Observable<void> {
    return this.operateOnNoteEntries((noteEntries) => {
      const index = noteEntries.findIndex((entry) => entry.id === id);
      if (index >= 0) {
        noteEntries[index] = modify(noteEntries[index]);
      } else {
        throw new Error(`Editing note entry with id ${id} not found`);
      }
    });
  }

  moveNoteEntry(from: number, to: number): Observable<void> {
    return this.operateOnNoteEntries((noteEntries) => {
      if (from < 0 || to < 0 || from >= noteEntries.length || to >= noteEntries.length) {
        throw new Error(`Moving note entries from ${from} to ${to}, index out of bounds of array length ${noteEntries.length}`);
      }
      noteEntries.splice(to, 0, ...noteEntries.splice(from, 1));
    });
  }

  deleteNoteEntry(id: string): Observable<void> {
    // Remove the note value
    this.getNoteValueStorageKey(id).set(null);
    // Remove from the note entries
    return this.operateOnNoteEntries((noteEntries) => {
      const index = noteEntries.findIndex((entry) => entry.id === id);
      if (index >= 0) {
        noteEntries.splice(index, 1);
      } else {
        throw new Error(`Editing note entry with id ${id} not found`);
      }
    });
  }

  private getNoteValueStorageKey(id: string): StorageKey<string> {
    return this.storage.stringKey(`note:${id}`);
  }

  getCurrentNoteValue(id: string): Observable<string> {
    return this.getNoteValueStorageKey(id).get().pipe(
      map((value) => value || ''),
      take(1),
    );
  }

  updateNoteValue(id: string, text: string): void {
    this.getNoteValueStorageKey(id).set(text);
  }
}
