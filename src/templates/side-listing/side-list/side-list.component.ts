import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Entry, Id } from 'src/common/types';

@Component({
  selector: 'lxs-side-list',
  templateUrl: './side-list.component.html',
  styleUrls: ['./side-list.component.scss'],
})
export class SideListComponent {

  @Input() label?: string;
  @Input() entries?: Entry[];
  @Input() selectedEntryId?: Id;

  @Input() showHelp?: boolean;

  @Output() addEvent = new EventEmitter<void>();
  @Output() helpEvent = new EventEmitter<void>();
  @Output() selectEvent = new EventEmitter<Id>();
  @Output() moveEvent = new EventEmitter<{ from: number; to: number }>();

  onDrag(event: CdkDragDrop<unknown>): void {
    if (event.previousIndex === event.currentIndex) { return; }
    this.moveEvent.emit({ from: event.previousIndex, to: event.currentIndex });
  }

  trackById(index: number, entry: Entry): string {
    return entry.id;
  }
}
