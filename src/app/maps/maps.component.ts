import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, NEVER, Observable, of, Subscription, switchMap } from 'rxjs';

import { SettingsService } from '../settings/settings.service';
import { isTileIdValid, MapData, MapEntry } from './maps.model';
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

interface MapsComponentSelectedTileState {
  state: 'map';
  view: 'tile';
  mapEntry: MapEntry;
  mapData: MapData;
  tileId: string;
}

type MapsComponentState = MapsComponentListState | MapsComponentSelectedState | MapsComponentSelectedTileState;

@Component({
  selector: 'lxs-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.scss'],
})
export class MapsComponent implements OnInit, OnDestroy {

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
        const tileId = params.get('tileId');
        if (id) {
          return combineLatest([of(id), of(tileId), this.maps.getMapEntry(id), this.maps.getMapData(id)]);
        } else {
          this.state = { state: 'list', view: 'list' };
          return this.redirectToRecent();
        }
      }),
    ).subscribe(([id, tileId, mapEntry, mapData]) => {
      if (mapEntry) {
        if (tileId) {
          if (isTileIdValid(tileId)) {
            this.state = {
              state: 'map',
              view: 'tile',
              mapEntry,
              mapData,
              tileId,
            };
          } else {
            this.router.navigate(['maps-tile-not-found', id, tileId]);
          }
        } else {
          this.state = {
            state: 'map',
            view: 'map',
            mapEntry,
            mapData,
          };
        }
      } else {
        this.router.navigate(['maps-not-found', id]);
      }
    }));
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
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

  onBackFromTile(): void {
    this.router.navigate(['maps', this.state.mapEntry?.id]);
  }

  onSelectedSameMapEntry(): void {
    if (this.state.state === 'map') {
      this.state.view = 'map';
    }
  }
}
