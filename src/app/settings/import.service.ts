import { Injectable, OnDestroy } from '@angular/core';
import { EMPTY, from, Observable, of, Subject, Subscription, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ImportService implements OnDestroy {

  private subscriptions = new Subscription();
  private importRequest = new Subject<void>();
  private fileEvent = new Subject<void>();
  private element?: HTMLInputElement;

  constructor() {
    this.subscriptions.add(
      this.importRequest.subscribe(() => {
        if (!this.element) {
          this.element = document.createElement('input');
          this.element.setAttribute('type', 'file');
          this.element.setAttribute('accept', 'text/json');
          this.element.addEventListener('change', (event) => {
            this.fileEvent.next();
          });
        }
        this.element.dispatchEvent(new MouseEvent('click'));
      })
    );
    this.subscriptions.add(
      this.fileEvent.pipe(
        switchMap(() => this.readFile()),
      ).subscribe((file) => {
        try {
          const val = JSON.parse(file);
          console.log(val);
        } catch (error) {
          console.error('File is not valid json');
        }
      })
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
      return throwError('No file selected');
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
}
