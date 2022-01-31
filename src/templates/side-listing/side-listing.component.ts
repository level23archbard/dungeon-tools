import { Component, EventEmitter, Input, Output } from '@angular/core';

export interface SideListingEntry {
  id: string;
  name: string;
};

@Component({
  selector: 'lxs-side-listing',
  templateUrl: './side-listing.component.html',
  styleUrls: ['./side-listing.component.scss'],
})
export class SideListingComponent {

  @Input() label?: string;
  @Input() entries?: SideListingEntry[];
  @Input() selectedEntryId?: string;

  @Output() addEvent = new EventEmitter<void>();
  @Output() helpEvent = new EventEmitter<void>();
  @Output() selectEvent = new EventEmitter<string>();
  @Output() moveEvent = new EventEmitter<{ from: number, to: number }>();

  onClickAdd(): void {
    this.addEvent.emit();
  }

  onClickHelp(): void {
    this.helpEvent.emit();
  }

  onClickEntry(entry: SideListingEntry): void {
    this.selectEvent.emit(entry.id);
  }

  onClickMoveUp(event: Event, entry: SideListingEntry, index: number): void {
    event.stopPropagation();
    if (index === 0) { return };
    this.moveEvent.emit({ from: index, to: index - 1 });
  }

  onClickMoveDown(event: Event, entry: SideListingEntry, index: number): void {
    event.stopPropagation();
    if (index === this.entries?.length ?? 0 - 1) { return };
    this.moveEvent.emit({ from: index, to: index + 1 });
  }

  trackById(index: number, entry: SideListingEntry): string {
    return entry.id;
  }
}
