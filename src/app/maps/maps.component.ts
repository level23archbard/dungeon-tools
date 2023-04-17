import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, NEVER, Observable, of, Subscription, switchMap } from 'rxjs';

import { SettingsService } from '../settings/settings.service';
import { MapData, MapDirection, MapEntry } from './maps.model';
import { MapsService } from './maps.service';

interface MapsComponentListState {
  state: 'list';
  view: 'list';
  mapEntry?: undefined;
}

interface MapsComponentSelectedState {
  state: 'map';
  view: 'map' | 'list';
  mapEntry: MapEntry;
  mapData: MapData;
}

type MapsComponentState = MapsComponentListState | MapsComponentSelectedState;

@Component({
  selector: 'lxs-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.scss'],
})
export class MapsComponent implements OnInit {

  private subscriptions = new Subscription();

  state: MapsComponentState = {
    state: 'list',
    view: 'list',
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private settings: SettingsService,
    private maps: MapsService,
  ) { }

  ngOnInit(): void {
    this.subscriptions.add(this.route.paramMap.pipe(
      switchMap((params) => {
        const id = params.get('id');
        if (id) {
          return combineLatest([of(id), this.maps.getMapEntry(id), this.maps.getMapData(id)]);
        } else {
          this.state = { state: 'list', view: 'list' };
          return this.redirectToRecent();
        }
      }),
    ).subscribe(([id, mapEntry, mapData]) => {
      if (mapEntry) {
        this.state = {
          state: 'map',
          view: 'map',
          mapEntry,
          mapData,
        };
      } else {
        this.router.navigate(['maps-not-found', id]);
      }
    }));
  }

  private redirectToRecent(): Observable<never> {
    const mostRecentId = this.settings.getCurrentSetting('mapsSelectedId');
    if (!mostRecentId) { return NEVER; }
    return this.maps.getMapEntry(mostRecentId).pipe(switchMap((entry) => {
      if (entry) {
        this.router.navigate(['maps', mostRecentId]);
      }
      return NEVER;
    }));
  }

  onBackFromMap(): void {
    this.state.view = 'list';
  }

  onSelectedSameMapEntry(): void {
    if (this.state.state === 'map') {
      this.state.view = 'map';
    }
  }

  onAdd(direction: MapDirection): void {
    if (this.state.state === 'list') { return; }
    const mapData = { ...this.state.mapData };
    let key: 'gridColumns' | 'gridRows';
    let offsetKey: 'gridOffsetX' | 'gridOffsetY' | undefined;
    switch (direction) {
    case 'left': case 'right':
      key = 'gridColumns';
      if (direction === 'left') { offsetKey = 'gridOffsetX'; }
      break;
    case 'top': case 'bottom':
      key = 'gridRows';
      if (direction === 'top') { offsetKey = 'gridOffsetY'; }
      break;
    }
    mapData[key] += 1;
    if (offsetKey) { mapData[offsetKey] -= 1; }
    this.maps.updateMapData(this.state.mapEntry.id, mapData);
  }

  onRemove(direction: MapDirection): void {
    if (this.state.state === 'list') { return; }
    const mapData = { ...this.state.mapData };
    let key: 'gridColumns' | 'gridRows';
    let offsetKey: 'gridOffsetX' | 'gridOffsetY' | undefined;
    switch (direction) {
    case 'left': case 'right':
      key = 'gridColumns';
      if (direction === 'left') { offsetKey = 'gridOffsetX'; }
      break;
    case 'top': case 'bottom':
      key = 'gridRows';
      if (direction === 'top') { offsetKey = 'gridOffsetY'; }
      break;
    }
    if (mapData[key] <= 1) { return; }
    mapData[key] -= 1;
    if (offsetKey) { mapData[offsetKey] += 1; }
    this.maps.updateMapData(this.state.mapEntry.id, mapData);
  }
}
