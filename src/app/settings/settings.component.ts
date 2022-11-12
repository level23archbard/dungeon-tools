import { Component, EventEmitter, Output } from '@angular/core';
import { ExportService } from './export.service';
import { ImportService } from './import.service';

@Component({
  selector: 'lxs-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent {
  
  @Output() closeEvent = new EventEmitter<void>();

  constructor(private exportService: ExportService, private importService: ImportService) {}

  onClickExport(): void {
    this.exportService.triggerExport();
  }

  onClickImport(): void {
    this.importService.triggerImport();
  }

  onClickClose(): void {
    this.closeEvent.emit();
  }
}
