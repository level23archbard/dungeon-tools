import { Injectable } from '@angular/core';
import { StorageKey, StorageService } from '@level23archbard/storage-service';
import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';

export interface Settings {
  notesSelectedId: string | null;
  notesIsViewing: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  private settings: StorageKey<Partial<Settings>>;
  private settingsSubject = new BehaviorSubject<Partial<Settings>>({});

  constructor(private storage: StorageService) {
    this.settings = this.storage.jsonKey('settings');
    this.settings.getWithDefault({}).subscribe(this.settingsSubject);
  }

  getCurrentSetting<K extends keyof Settings>(key: K): Partial<Settings>[K] {
    return this.settingsSubject.value[key];
  }

  getSetting<K extends keyof Settings>(key: K): Observable<Partial<Settings>[K]> {
    return this.settingsSubject.pipe(
      map((settings) => settings[key]),
      distinctUntilChanged()
    );
  }

  setSetting<K extends keyof Settings>(key: K, value: Partial<Settings>[K]): void {
    const settings = this.settingsSubject.value;
    settings[key] = value;
    this.settings.set(settings);
  }
}
