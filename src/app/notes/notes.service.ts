import { Injectable } from '@angular/core';
import { StorageKey, StorageService } from '@level23archbard/storage-service';
import { AsyncSubject, Observable, of } from 'rxjs';
import { map, take } from 'rxjs/operators';

import { IdService } from '../id.service';
import { ExportableService, ExportedData } from '../settings/export.model';

export interface NoteEntry {
  id: string;
  name: string;
  link: string;
}

@Injectable({
  providedIn: 'root',
})
export class NotesService implements ExportableService {

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

  addNoteEntry(name?: string): Observable<string> {
    return this.operateOnNoteEntries((noteEntries) => {
      const id = this.id.generate();
      noteEntries.unshift({
        id,
        name: name || 'New Note',
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

  exportInto(data: ExportedData): Observable<ExportedData> {
    const noteEntries = this.noteEntries.getCurrentWithDefault([]);
    data.noteEntries = noteEntries;
    const notes = noteEntries.map((entry) => [entry.id, this.getNoteValueStorageKey(entry.id).getCurrentWithDefault('')]);
    data.notes = {};
    notes.forEach(([id, note]) => {
      data.notes[id] = note;
    });
    return of(data);
  }

  validateImport(data: ExportedData): Observable<boolean> {
    if (!Array.isArray(data.noteEntries)) {
      return of(false);
    }
    for (const entry of data.noteEntries) {
      if (typeof entry.id !== 'string' || typeof entry.name !== 'string') {
        return of(false);
      }
    }
    if (!data.notes) {
      return of(false);
    }
    return of(true);
  }

  importFrom(data: ExportedData): Observable<void> {
    this.noteEntries.set(data.noteEntries);
    for (const entry of data.noteEntries) {
      this.getNoteValueStorageKey(entry.id).set(data.notes[entry.id]);
    }
    return of(void 0);
  }
}
