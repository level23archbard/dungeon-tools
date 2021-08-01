import { Injectable } from '@angular/core';
import { StorageKey, StorageService } from '@level23archbard/storage-service';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WelcomeService {

  private isChecked = new BehaviorSubject(false);
  private store: StorageKey<string>;

  constructor(private storage: StorageService) {
    this.store = this.storage.stringKey('check');
    this.store.get().subscribe((value) => {
      this.isChecked.next(value !== null);
    });
  }

  get checked(): Observable<boolean> {
    return this.isChecked.asObservable();
  }

  check(): void {
    this.store.set('check');
  }
}
