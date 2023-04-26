import { Injectable } from '@angular/core';
import { StorageKey, StorageService } from '@level23archbard/storage-service';
import { Observable, of } from 'rxjs';
import { map, take } from 'rxjs/operators';

import { byId } from 'src/common/id.utils';
import { findInTree, findSubtreeInTree, flatTree, getGroupAtHierarchy, itemIsEntry } from 'src/common/tree.utils';
import { TreeGroup, TreeHierarchy } from 'src/common/types';

import { IdService } from '../id.service';
import { ExportableService, ExportedData } from '../settings/export.model';
import { NoteData, NoteEntry, NoteStore } from './notes.model';

@Injectable({
  providedIn: 'root',
})
export class NotesService implements ExportableService {

  private noteEntries: StorageKey<NoteStore>;

  constructor(private id: IdService, private storage: StorageService) {
    this.noteEntries = this.storage.jsonKey('noteEntries');
  }

  get noteStore(): Observable<NoteStore> {
    return this.noteEntries.getWithDefault([]);
  }

  getNoteEntry(id: string): Observable<NoteEntry | undefined> {
    return this.noteStore.pipe(map((store) => findInTree(store, (item) => item.id === id && itemIsEntry(item))));
  }

  get noteFlatEntriesList(): Observable<NoteEntry[]> {
    return this.noteStore.pipe(map((store) => flatTree(store)));
  }

  private operateOnNoteStore<T>(operation: (noteStore: NoteStore) => T): T {
    const noteStore = this.noteEntries.getCurrentWithDefault([]);
    const returnValue = operation(noteStore);
    this.noteEntries.set(noteStore);
    return returnValue;
  }

  addNoteEntry(intoHierarchy: TreeHierarchy, name?: string): string {
    return this.operateOnNoteStore((noteStore) => {
      const id = this.id.generate();
      const newNote: NoteEntry = { id, name: name || 'New Note' };
      const group = getGroupAtHierarchy(noteStore, intoHierarchy);
      (group?.children || noteStore).unshift(newNote);
      return id;
    });
  }

  addNoteGroup(intoHierarchy: TreeHierarchy, name?: string): string {
    return this.operateOnNoteStore((noteStore) => {
      const id = this.id.generate();
      const newGroup: TreeGroup = { id, name: name || 'New Group', isGroup: true, children: [] };
      const group = getGroupAtHierarchy(noteStore, intoHierarchy);
      (group?.children || noteStore).unshift(newGroup);
      return id;
    });
  }

  editNoteEntry(id: string, modify: (noteEntry: NoteEntry) => NoteEntry): void {
    return this.operateOnNoteStore((noteStore) => {
      const subtree = findSubtreeInTree(noteStore, byId(id));
      if (subtree) {
        const index = subtree.findIndex(byId(id));
        subtree[index] = modify(subtree[index]);
      } else {
        throw new Error(`Editing note entry with id ${id} not found`);
      }
    });
  }

  editNoteGroup(id: string, modify: (noteGroup: TreeGroup) => TreeGroup): void {
    return this.operateOnNoteStore((noteStore) => {
      const subtree = findSubtreeInTree(noteStore, byId(id));
      if (subtree) {
        const index = subtree.findIndex(byId(id));
        const group = subtree[index];
        if (group.isGroup) {
          subtree[index] = modify(group);
        } else {
          throw new Error(`Editing note group with id ${id} not a group`);
        }
      } else {
        throw new Error(`Editing note group with id ${id} not found`);
      }
    });
  }

  moveNoteEntry(inHierarchy: TreeHierarchy, from: number, to: number): void {
    return this.operateOnNoteStore((noteStore) => {
      const group = getGroupAtHierarchy(noteStore, inHierarchy);
      const array = group?.children || noteStore;
      if (from < 0 || to < 0 || from >= array.length || to >= array.length) {
        throw new Error(`Moving note entries from ${from} to ${to}, index out of bounds of array length ${array.length}`);
      }
      array.splice(to, 0, ...array.splice(from, 1));
    });
  }

  moveNoteEntryToHierarchy(id: string, toHierarchy: TreeHierarchy): void {
    return this.operateOnNoteStore((noteStore) => {
      const fromSubtree = findSubtreeInTree(noteStore, byId(id));
      if (!fromSubtree) {
        throw new Error(`Moving note entry ${id}, not found`);
      }
      const fromIndex = fromSubtree.findIndex(byId(id));
      const entry = fromSubtree[fromIndex];
      const toGroup = getGroupAtHierarchy(noteStore, toHierarchy);
      const toArray = toGroup?.children || noteStore;
      fromSubtree.splice(fromIndex, 1);
      toArray.push(entry);
    });
  }

  deleteNoteEntry(id: string): void {
    // Remove the note value
    this.getNoteValueStorageKey(id).set(null);
    // Remove from the note entries
    this.operateOnNoteStore((noteStore) => {
      const subtree = findSubtreeInTree(noteStore, byId(id));
      if (subtree) {
        const index = subtree.findIndex(byId(id));
        subtree.splice(index, 1);
      } else {
        throw new Error(`Deleting note entry with id ${id} not found`);
      }
    });
  }

  deleteNoteGroup(id: string): void {
    this.operateOnNoteStore((noteStore) => {
      const subtree = findSubtreeInTree(noteStore, byId(id));
      if (subtree) {
        const index = subtree.findIndex(byId(id));
        const group = subtree[index];
        if (!group.isGroup) {
          throw new Error(`Deleting note group with id ${id} not a group`);
        }
        subtree.splice(index, 1);
        subtree.push(...group.children);
      } else {
        throw new Error(`Deleting note group with id ${id} not found`);
      }
    });
  }

  private getNoteValueStorageKey(id: string): StorageKey<NoteData> {
    return this.storage.stringKey(`note:${id}`);
  }

  getCurrentNoteValue(id: string): Observable<NoteData> {
    return this.getNoteValueStorageKey(id).get().pipe(
      map((value) => value || ''),
      take(1),
    );
  }

  updateNoteValue(id: string, text: NoteData): void {
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
