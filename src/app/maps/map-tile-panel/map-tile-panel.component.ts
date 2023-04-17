import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

import { LinkerService } from 'src/app/linker.service';
import { SideHeaderAction } from 'src/templates/side-header/side-header.component';

import { MapData, MapEntry, MapTileData, tileIdToCoordinates } from '../maps.model';
import { MapsService } from '../maps.service';

const getDefaultTileData = (id: string): MapTileData => {
  const coords = tileIdToCoordinates(id);
  return {
    ...coords,
  };
};

@Component({
  selector: 'lxs-map-tile-panel',
  templateUrl: './map-tile-panel.component.html',
  styleUrls: ['./map-tile-panel.component.scss'],
})
export class MapTilePanelComponent implements OnChanges {

  @Input() mapEntry!: MapEntry;
  @Input() mapData!: MapData;
  @Input() tileId!: string;
  @Output() clickBack = new EventEmitter<void>();

  tileData!: MapTileData;

  constructor(public linker: LinkerService, private maps: MapsService) {}

  ngOnChanges(_changes: SimpleChanges): void {
    this.tileData = this.mapData.tiles[this.tileId] || getDefaultTileData(this.tileId);
  }

  backAction: SideHeaderAction = {
    icon: 'back',
    action: () => {
      this.clickBack.emit();
    },
  };

  onNoteChanged(newValue: string): void {
    this.tileData.note = newValue;
    this.mapData.tiles[this.tileId] = this.tileData;
    this.maps.updateMapData(this.mapEntry.id, this.mapData);
  }
}
