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
  @Output() selectEvent = new EventEmitter<string>();

  onClickAdd(): void {
    this.addEvent.emit();
  }

  onClickEntry(entry: SideListingEntry): void {
    this.selectEvent.emit(entry.id);
  }
}
