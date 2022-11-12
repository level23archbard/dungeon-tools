import { Injectable, OnDestroy } from '@angular/core';
import { Observable, of, Subject, Subscription } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { NotesService } from '../notes/notes.service';
import { ExportedData } from './export.model';

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

  private createEmptyExportedData(): ExportedData {
    return {} as ExportedData;
  }

  private generateExport(): Observable<string> {
    return of(this.createEmptyExportedData()).pipe(
      switchMap((val) => this.notes.exportInto(val)),
      map((val) => JSON.stringify(val)),
    );
  }

  triggerExport(): void {
    this.exportRequest.next();
  }
}
