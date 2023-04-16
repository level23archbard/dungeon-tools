import { Injectable } from '@angular/core';
import { StorageKey, StorageService } from '@level23archbard/storage-service';
import { map, Observable } from 'rxjs';

import { IdService } from '../id.service';
import { MapData, MapEntry } from './maps.model';

const defaultMapData = (): MapData => ({
  gridColumns: 10,
  gridRows: 10,
  gridOffsetX: 0,
  gridOffsetY: 0,
  tiles: {},
});

@Injectable({
  providedIn: 'root',
})
export class MapsService {

  private mapEntries: StorageKey<MapEntry[]>;

  constructor(private id: IdService, private storage: StorageService) {
    this.mapEntries = this.storage.jsonKey('mapEntries');
  }

  get mapEntriesList(): Observable<MapEntry[]> {
    return this.mapEntries.getWithDefault([]);
  }

  getMapEntry(id: string): Observable<MapEntry | undefined> {
    return this.mapEntriesList.pipe(map((entries) => entries.find((entry) => entry.id === id)));
  }

  addMapEntry(name?: string): string {
    const mapEntries = this.mapEntries.getCurrentWithDefault([]);
    const id = this.id.generate();
    mapEntries.unshift({
      id,
      name: name || 'New Map',
    });
    this.mapEntries.set(mapEntries);
    return id;
  }

  editMapEntry(id: string, modify: (mapEntry: MapEntry) => MapEntry): void {
    const mapEntries = this.mapEntries.getCurrentWithDefault([]);
    const index = mapEntries.findIndex((entry) => entry.id === id);
    if (index >= 0) {
      mapEntries[index] = modify(mapEntries[index]);
    } else {
      throw new Error(`Editing map entry with id ${id} not found`);
    }
    this.mapEntries.set(mapEntries);
  }

  moveMapEntry(from: number, to: number): void {
    const mapEntries = this.mapEntries.getCurrentWithDefault([]);
    if (from < 0 || to < 0 || from >= mapEntries.length || to >= mapEntries.length) {
      throw new Error(`Moving map entries from ${from} to ${to}, index out of bounds of array length ${mapEntries.length}`);
    }
    mapEntries.splice(to, 0, ...mapEntries.splice(from, 1));
    this.mapEntries.set(mapEntries);
  }

  deleteMapEntry(id: string): void {
    // Remove the map value
    this.getMapDataStorageKey(id).set(null);
    // Remove from the map entries
    const mapEntries = this.mapEntries.getCurrentWithDefault([]);
    const index = mapEntries.findIndex((entry) => entry.id === id);
    if (index >= 0) {
      mapEntries.splice(index, 1);
    } else {
      throw new Error(`Deleting map entry with id ${id} not found`);
    }
    this.mapEntries.set(mapEntries);
  }

  private getMapDataStorageKey(id: string): StorageKey<MapData> {
    return this.storage.jsonKey(`map:${id}`);
  }

  getMapData(id: string): Observable<MapData> {
    return this.getMapDataStorageKey(id).getWithDefault(defaultMapData());
  }

  updateMapData(id: string, data: MapData): void {
    this.getMapDataStorageKey(id).set(data);
  }
}
