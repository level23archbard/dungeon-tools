import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { map, take } from 'rxjs/operators';

import { NoteEntry, NotesService } from './notes/notes.service';

export interface Link {
  text: string;
  ref: string[];
}

@Injectable({
  providedIn: 'root',
})
export class LinkerService {

  private notesCache = new ReplaySubject<NoteEntry[]>(1);

  constructor(private notes: NotesService) {
    this.notes.noteEntriesList.subscribe(this.notesCache);
  }

  private reduce(str: string): string {
    return str.replace(/[^A-Za-z0-9]/g, '').toLowerCase();
  }

  evaluate(tag: string): Observable<Link | null> {
    const reducedTag = this.reduce(tag);
    return this.notesCache.pipe(
      map((notes) => {
        for (const note of notes) {
          if (reducedTag === this.reduce(note.name)) {
            return {
              text: note.name,
              ref: ['/notes', note.id],
            };
          }
        }
        return null;
      }),
      take(1),
    );
  }
}
