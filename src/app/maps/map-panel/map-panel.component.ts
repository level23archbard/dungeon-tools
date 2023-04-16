import { Component, EventEmitter, Input, Output } from '@angular/core';

import { MapData, MapDirection, MapEntry } from '../maps.model';

@Component({
  selector: 'lxs-map-panel',
  templateUrl: './map-panel.component.html',
  styleUrls: ['./map-panel.component.scss'],
})
export class MapPanelComponent {

  @Input() mapEntry!: MapEntry;
  @Input() mapData!: MapData;

  @Output() clickAdd = new EventEmitter<MapDirection>();
  @Output() clickRemove = new EventEmitter<MapDirection>();
}
