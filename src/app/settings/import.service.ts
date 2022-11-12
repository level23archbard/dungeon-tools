import { Injectable, OnDestroy } from '@angular/core';
import { EMPTY, forkJoin, from, Observable, of, Subject, Subscription, throwError } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { NotesService } from '../notes/notes.service';
import { ExportedData } from './export.model';

@Injectable({
  providedIn: 'root',
})
export class ImportService implements OnDestroy {

  private subscriptions = new Subscription();
  private importRequest = new Subject<void>();
  private fileEvent = new Subject<void>();
  private element?: HTMLInputElement;

  constructor(private notes: NotesService) {
    this.subscriptions.add(
      this.importRequest.subscribe(() => {
        if (!this.element) {
          this.element = document.createElement('input');
          this.element.setAttribute('type', 'file');
          this.element.setAttribute('accept', 'text/json');
          this.element.addEventListener('change', (_) => {
            this.fileEvent.next();
          });
        }
        this.element.dispatchEvent(new MouseEvent('click'));
      }),
    );
    this.subscriptions.add(
      this.fileEvent.pipe(
        switchMap(() => this.readFile()),
        switchMap((text) => this.extractExportedData(text)),
        switchMap((data) => this.validateExportedData(data)),
        switchMap((data) => this.importData(data)),
      ).subscribe(),
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  triggerImport(): void {
    this.importRequest.next();
  }

  private getFile(): Observable<File> {
    if (this.element?.files?.length) {
      return of(this.element.files[0]);
    } else {
      return throwError(() => 'No file selected');
    }
  }

  private readFile(): Observable<string> {
    return this.getFile().pipe(
      switchMap((file) => from(this.readFileAsync(file))),
      catchError((error) => {
        console.error(error);
        return EMPTY;
      }),
    );
  }

  private async readFileAsync(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result;
        if (typeof result === 'string') {
          resolve(result);
        } else {
          reject('Unexpected error from reading file');
        }
      };
      reader.onerror = (_) => {
        reject('Unable to read file');
      };
      reader.readAsText(file);
    });
  }

  private extractExportedData(text: string): Observable<ExportedData> {
    try {
      const data = JSON.parse(text);
      return of(data);
    } catch {
      console.error('File is not valid json');
      return EMPTY;
    }
  }

  private validateExportedData(data: ExportedData): Observable<ExportedData> {
    return forkJoin([this.notes.validateImport(data)]).pipe(
      switchMap((results) => {
        if (results.some((result) => !result)) {
          console.error('Some validation error occurred!');
          return EMPTY;
        }
        return of(data);
      }),
    );
  }

  private importData(data: ExportedData): Observable<void> {
    return forkJoin([this.notes.importFrom(data)]).pipe(
      map(() => {
        console.log('Import complete');
      }),
    );
  }
}
