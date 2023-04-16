import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';

import { SettingsService } from 'src/app/settings/settings.service';

import { MapEntry } from '../maps.model';
import { MapsService } from '../maps.service';

@Component({
  selector: 'lxs-maps-list',
  templateUrl: './maps-list.component.html',
  styleUrls: ['./maps-list.component.scss'],
})
export class MapsListComponent implements OnInit, OnDestroy {

  @Input() activeEntryId?: string;

  private subscriptions = new Subscription();

  mapEntries?: MapEntry[];

  addEvent = new Subject<void>();

  constructor(
    private router: Router,
    private settings: SettingsService,
    private maps: MapsService,
  ) {}

  ngOnInit(): void {
    this.subscriptions.add(this.maps.mapEntriesList.subscribe((mapEntries) => {
      this.mapEntries = mapEntries;
    }));
    this.subscriptions.add(this.addEvent.subscribe(() => {
      const entryId = this.maps.addMapEntry();
      this.settings.setSetting('mapsSelectedId', entryId);
      this.router.navigate(['maps', entryId]);
    }));
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  onSelect(entryId: string): void {
    if (entryId !== this.activeEntryId) {
      this.settings.setSetting('mapsSelectedId', entryId);
      this.router.navigate(['maps', entryId]);
    }
  }

  onMove(movement: { from: number; to: number }): void {
    this.maps.moveMapEntry(movement.from, movement.to);
  }
}
