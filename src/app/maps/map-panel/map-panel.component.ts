import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';

import { LinkerService } from 'src/app/linker.service';
import { SideHeaderAction } from 'src/templates/side-header/side-header.component';

import { MapData, MapDirection, MapEntry } from '../maps.model';
import { MapsService } from '../maps.service';

@Component({
  selector: 'lxs-map-panel',
  templateUrl: './map-panel.component.html',
  styleUrls: ['./map-panel.component.scss'],
})
export class MapPanelComponent implements OnChanges {

  @Input() mapEntry!: MapEntry;
  @Input() mapData!: MapData;

  @Output() clickBack = new EventEmitter<void>();
  @Output() clickAdd = new EventEmitter<MapDirection>();
  @Output() clickRemove = new EventEmitter<MapDirection>();

  isRenaming = false;
  renamingControl = new UntypedFormControl('');
  backgroundImageControl = new UntypedFormControl('');
  imageCheckUrl?: string;
  imageCheckStatus?: string;

  constructor(public linker: LinkerService, private maps: MapsService) {}

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
