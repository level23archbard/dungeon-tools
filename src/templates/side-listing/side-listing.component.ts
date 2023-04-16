import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Input, Output } from '@angular/core';

export interface SideListingEntry {
  id: string;
  name: string;
}

@Component({
  selector: 'lxs-side-listing',
  templateUrl: './side-listing.component.html',
  styleUrls: ['./side-listing.component.scss'],
})
export class SideListingComponent {

  @Input() label?: string;
  @Input() entries?: SideListingEntry[];
  @Input() selectedEntryId?: string;

  @Input() showHelp?: boolean;

  @Output() addEvent = new EventEmitter<void>();
  @Output() helpEvent = new EventEmitter<void>();
  @Output() selectEvent = new EventEmitter<string>();
  @Output() moveEvent = new EventEmitter<{ from: number; to: number }>();

  onClickAdd(): void {
    this.addEvent.emit();
  }

  onClickHelp(): void {
    this.helpEvent.emit();
  }

  onClickEntry(entry: SideListingEntry): void {
    this.selectEvent.emit(entry.id);
  }

  onDrag(event: CdkDragDrop<unknown>): void {
    if (event.previousIndex === event.currentIndex) { return; }
    this.moveEvent.emit({ from: event.previousIndex, to: event.currentIndex });
  }

  trackById(index: number, entry: SideListingEntry): string {
    return entry.id;
  }
}
