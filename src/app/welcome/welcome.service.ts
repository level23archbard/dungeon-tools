import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { StorageKey, StorageService } from '../storage.service';

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
