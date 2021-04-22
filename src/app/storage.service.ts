import { Inject, Injectable, Optional } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface StorageKey<T> {
  get(): Observable<T | null>;
  set(value: T | null): void;
}

@Injectable({
  providedIn: 'root',
})
export class StorageService {

  private keys: Record<string, ConcreteStorageKey> = {};

  constructor(
    @Inject('LXS_WINDOW') @Optional() private window: Window | null,
    @Inject('LXS_LOCAL_STORAGE') @Optional() private localStorage: Storage | null,
  ) {
    if (this.window) {
      this.window.addEventListener('storage', (event) => {
        if (event.key) {
          const key = this.keys[event.key];
          if (key) {
            key.storageSubject.next(event.newValue);
          }
        }
      });
    }
  }

  private findKey(key: string, createKey: (key: string) => ConcreteStorageKey): ConcreteStorageKey {
    const existing = this.keys[key];
    if (existing) {
      return existing;
    } else {
      const created = createKey(key);
      this.keys[key] = created;
      return created;
    }
  }

  stringKey(key: string): StorageKey<string> {
    return this.findKey(key, () => new ConcreteStorageKey(key, this.localStorage));
  }

  jsonKey<T>(key: string): StorageKey<T> {
    return this.findKey(key, () => new ConcreteJsonStorageKey(key, this.localStorage));
  }
}

class ConcreteStorageKey implements StorageKey<any> {

  storageSubject: BehaviorSubject<string | null>;

  constructor(private key: string, private storage: Storage | null) {
    let initialValue: string | null;
    if (this.storage) {
      initialValue = this.storage.getItem(this.key);
    } else {
      initialValue = null;
    }
    this.storageSubject = new BehaviorSubject(initialValue);
  }

  get(): Observable<any | null> {
    return this.storageSubject.pipe(map((raw) => this.fromRaw(raw)));
  }

  set(value: any | null): void {
    const rawValue = this.toRaw(value);
    if (this.storage) {
      if (rawValue) {
        this.storage.setItem(this.key, rawValue);
      } else {
        this.storage.removeItem(this.key);
      }
    }
    this.storageSubject.next(rawValue);
  }

  toRaw(value: any): string | null {
    return value;
  }

  fromRaw(raw: string | null): any {
    return raw;
  }
}

class ConcreteJsonStorageKey extends ConcreteStorageKey {

  toRaw(value: any): string | null {
    if (value) {
      return JSON.stringify(value, null, 2);
    } else {
      return null;
    }
  }

  fromRaw(raw: string | null): any {
    if (raw) {
      return JSON.parse(raw);
    } else {
      return null;
    }
  }
}
