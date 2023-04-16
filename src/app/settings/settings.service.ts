import { Injectable } from '@angular/core';
import { StorageKey, StorageService } from '@level23archbard/storage-service';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';

import { ExportableService, ExportedData } from './export.model';
import { Settings } from './settings.model';

@Injectable({
  providedIn: 'root',
})
export class SettingsService implements ExportableService {

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
      distinctUntilChanged(),
    );
  }

  setSetting<K extends keyof Settings>(key: K, value: Partial<Settings>[K]): void {
    const settings = this.settingsSubject.value;
    settings[key] = value;
    this.settings.set(settings);
  }

  exportInto(data: ExportedData): Observable<ExportedData> {
    data.settings = this.settingsSubject.value;
    return of(data);
  }

  validateImport(_data: ExportedData): Observable<boolean> {
    return of(true);
  }

  importFrom(data: ExportedData): Observable<void> {
    this.setSetting('notesSelectedId', data.settings.notesSelectedId);
    this.setSetting('mapsSelectedId', data.settings.mapsSelectedId);
    return of(void 0);
  }
}
