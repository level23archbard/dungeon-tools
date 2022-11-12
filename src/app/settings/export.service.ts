import { Injectable, OnDestroy } from '@angular/core';
import { forkJoin, Observable, of, Subject, Subscription } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';

import { NotesService } from '../notes/notes.service';

@Injectable({
  providedIn: 'root',
})
export class ExportService implements OnDestroy {

  private subscriptions = new Subscription();
  private exportRequest = new Subject<void>();
  private element?: HTMLElement;

  constructor(private notes: NotesService) {
    this.subscriptions.add(
      this.exportRequest.pipe(
        switchMap(() => this.generateExport()),
      ).subscribe((output) => {
        if (!this.element) {
          this.element = document.createElement('a');
        }
        this.element.setAttribute('href', `data:text/json;charset=utf-8,${encodeURIComponent(output)}`);
        this.element.setAttribute('download', 'Dungeon Tools Data.json');
        this.element.dispatchEvent(new MouseEvent('click'));
      }),
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  private generateExport(): Observable<string> {
    return of({}).pipe(
      switchMap((val) => this.generateExportedNotesInto(val)),
      map((val) => JSON.stringify(val)),
    );
  }

  private generateExportedNotesInto(val: any): Observable<any> {
    return this.notes.noteEntriesList.pipe(
      tap((entries) => {
        val.noteEntries = entries;
      }),
      switchMap((entries) => {
        if (entries.length) {
          return forkJoin(entries.map((entry) => this.notes.getCurrentNoteValue(entry.id).pipe(map((note) => [entry.id, note]))));
        } else {
          return of([]);
        }
      }),
      map((notes) => {
        val.notes = {};
        notes.forEach(([id, note]) => {
          val.notes[id] = note;
        });
        return val;
      }),
    );
  }

  triggerExport(): void {
    this.exportRequest.next();
  }
}
