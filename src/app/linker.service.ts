import { Injectable } from '@angular/core';
import { combineLatest, Observable, ReplaySubject } from 'rxjs';
import { map, take } from 'rxjs/operators';

import { InscriptionLinkEvaluator } from 'src/templates/inscription/inscription.model';

import { Entries } from './entries.model';
import { MapEntry } from './maps/maps.model';
import { MapsService } from './maps/maps.service';
import { NoteEntry } from './notes/notes.model';
import { NotesService } from './notes/notes.service';

export interface Link {
  text: string;
  ref: string[];
}

@Injectable({
  providedIn: 'root',
})
export class LinkerService implements InscriptionLinkEvaluator {

  private mapsCache = new ReplaySubject<MapEntry[]>(1);
  private notesCache = new ReplaySubject<NoteEntry[]>(1);

  constructor(
    private maps: MapsService,
    private notes: NotesService,
  ) {
    this.maps.mapEntriesList.subscribe(this.mapsCache);
    this.notes.noteEntriesList.subscribe(this.notesCache);
  }

  private reduce(str: string): string {
    return str.replace(/[^A-Za-z0-9]/g, '').toLowerCase();
  }

  evaluate(tag: string, preferredSource?: string): Observable<Link | null> {
    const reducedTag = this.reduce(tag);
    return combineLatest([this.notesCache, this.mapsCache]).pipe(
      map(([notes, maps]) =>
        this.checkPreferredSource({ notes , maps }, reducedTag, preferredSource)
          || this.checkEntries(notes, reducedTag, 'notes')
          || this.checkEntries(maps, reducedTag, 'maps')),
      take(1),
    );
  }

  private checkPreferredSource(entries: { [s: string]: Entries}, tag: string, preferredSource?: string): Link | null {
    switch (preferredSource) {
    case 'notes': case 'maps':
      return this.checkEntries(entries[preferredSource], tag, preferredSource);
    default:
      return null;
    }
  }

  private checkEntries(entries: Entries, tag: string, source: 'notes' | 'maps'): Link | null {
    for (const entry of entries) {
      if (tag === this.reduce(entry.name)) {
        return {
          text: entry.name,
          ref: [source, entry.id],
        };
      }
    }
    return null;
  }
}
