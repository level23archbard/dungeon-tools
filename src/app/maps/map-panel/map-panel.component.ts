import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';

import { LinkerService } from 'src/app/linker.service';
import { ConfirmDialogComponent } from 'src/templates/confirm-dialog/confirm-dialog.component';
import { SideHeaderAction } from 'src/templates/side-header/side-header.component';

import { MapData, MapEntry } from '../maps.model';
import { MapsService } from '../maps.service';

type MapDirection = 'top' | 'right' | 'bottom' | 'left';

@Component({
  selector: 'lxs-map-panel',
  templateUrl: './map-panel.component.html',
  styleUrls: ['./map-panel.component.scss'],
})
export class MapPanelComponent implements OnChanges {

  @Input() mapEntry!: MapEntry;
  @Input() mapData!: MapData;

  @Output() clickBack = new EventEmitter<void>();

  isRenaming = false;
  renamingControl = new UntypedFormControl('');
  backgroundImageControl = new UntypedFormControl('');
  imageCheckUrl?: string;
  imageCheckStatus?: string;
  private subscriptions = new Subscription();

  constructor(private dialog: MatDialog, public linker: LinkerService, private maps: MapsService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.mapEntry) {
      if (!this.isRenaming) {
        this.renamingControl.setValue(this.mapEntry.name);
      }
    }
    if (changes.mapData) {
      this.backgroundImageControl.setValue(this.mapData.backgroundImage);
    }
  }

  backAction: SideHeaderAction = {
    icon: 'back',
    action: () => {
      this.clickBack.emit();
    },
  };

  renameAction: SideHeaderAction = {
    icon: 'quill',
    action: () => {
      this.isRenaming = true;
    },
  };

  renameCancelAction: SideHeaderAction = {
    icon: 'close',
    action: () => {
      this.isRenaming = false;
      this.renamingControl.setValue(this.mapEntry.name);
    },
  };

  renameSaveAction: SideHeaderAction = {
    icon: 'check',
    action: () => {
      this.isRenaming = false;
      this.maps.editMapEntry(this.mapEntry.id, (mapEntry) => {
        mapEntry.name = this.renamingControl.value;
        return mapEntry;
      });
    },
  };

  onMapNoteChanged(newValue: string): void {
    this.mapData.note = newValue;
    this.maps.updateMapData(this.mapEntry.id, this.mapData);
  }

  onAdd(direction: MapDirection): void {
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
    const mapData = { ...this.mapData };
    mapData[key] += 1;
    if (offsetKey) { mapData[offsetKey] -= 1; }
    this.maps.updateMapData(this.mapEntry.id, mapData);
  }

  onRemove(direction: MapDirection): void {
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
    if (this.mapData[key] <= 1) { return; }
    let shouldWarn = false;
    const startValue = key === 'gridColumns' ? this.mapData.gridOffsetY : this.mapData.gridOffsetX;
    const endValue = startValue + (key === 'gridColumns' ? this.mapData.gridRows : this.mapData.gridColumns);
    const fixValue = (key === 'gridColumns' ? this.mapData.gridOffsetX : this.mapData.gridOffsetY)
      + (direction === 'right' || direction === 'bottom' ? this.mapData[key] - 1 : 0);
    for (let value = startValue; value < endValue; value++) {
      const col = key === 'gridColumns' ? fixValue : value;
      const row = key === 'gridColumns' ? value : fixValue;
      const tileId = `${col}_${row}`;
      if (this.mapData.tiles[tileId]) {
        shouldWarn = true;
        break;
      }
    }
    const complete = () => {
      const mapData = { ...this.mapData, tiles: { ...this.mapData.tiles } };
      mapData[key] -= 1;
      if (offsetKey) { mapData[offsetKey] += 1; }
      for (let value = startValue; value < endValue; value++) {
        const col = key === 'gridColumns' ? fixValue : value;
        const row = key === 'gridColumns' ? value : fixValue;
        const tileId = `${col}_${row}`;
        delete mapData.tiles[tileId];
      }
      this.maps.updateMapData(this.mapEntry.id, mapData);
    };
    if (shouldWarn) {
      this.subscriptions.add(this.dialog.open(ConfirmDialogComponent, { data: { message: 'Are you sure you want to delete these tiles?' }})
        .afterClosed().subscribe((confirm) => {
          if (confirm) { complete(); }
        }));
    } else {
      complete();
    }
  }

  onClickCheckImage(): void {
    const value = this.backgroundImageControl.value;
    this.imageCheckUrl = value;
    this.imageCheckStatus = undefined;
    if (!value) {
      this.mapData.backgroundImage = undefined;
      this.maps.updateMapData(this.mapEntry.id, this.mapData);
      this.imageCheckStatus = 'Saved successfully.';
    }
  }

  onCheckImageLoadSuccess(): void {
    this.mapData.backgroundImage = this.imageCheckUrl;
    this.imageCheckUrl = undefined;
    this.maps.updateMapData(this.mapEntry.id, this.mapData);
    this.imageCheckStatus = 'Loaded and saved successfully.';
  }

  onCheckImageLoadError(): void {
    this.imageCheckUrl = undefined;
    this.imageCheckStatus = 'Unable to load image. Check the URL to make sure it can be accessed by your browser, or try a different path.';
  }
}
