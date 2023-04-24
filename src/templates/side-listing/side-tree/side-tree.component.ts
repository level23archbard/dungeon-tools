import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

import { findHierarchyInTree, getGroupAtHierarchy } from 'src/common/tree.utils';
import { Id, TreeGroup, TreeHierarchy, TreeItem } from 'src/common/types';

export interface SideTreeAddEvent {
  type: 'entry' | 'group';
  hierarchy: TreeHierarchy;
}

export interface SideTreeMoveEvent {
  from: number;
  to: number;
  hierarchy: TreeHierarchy;
}

@Component({
  selector: 'lxs-side-tree',
  templateUrl: './side-tree.component.html',
  styleUrls: ['./side-tree.component.scss'],
})
export class SideTreeComponent implements OnChanges {

  @Input() label?: string;
  @Input() tree?: TreeItem[];
  @Input() selectedEntryId?: Id;

  @Input() showHelp?: boolean;

  @Output() addEvent = new EventEmitter<SideTreeAddEvent>();
  @Output() helpEvent = new EventEmitter<void>();
  @Output() selectEvent = new EventEmitter<Id>();
  @Output() moveEvent = new EventEmitter<SideTreeMoveEvent>();
  @Output() renameGroupEvent = new EventEmitter<TreeGroup>();
  @Output() deleteGroupEvent = new EventEmitter<TreeGroup>();

  currentHierarchy: TreeHierarchy = [];
  currentGroup?: TreeGroup;
  currentTree?: TreeItem[];
  currentSelectionId?: Id;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.tree) {
      this.rebuildTree();
    }
    if (changes.selectedEntryId) {
      this.redirectSelection();
    }
  }

  onBack(): void {
    if (!this.tree) { this.revertProperties(); return; }
    this.currentHierarchy = this.currentHierarchy.slice(0, -1);
    this.currentGroup = getGroupAtHierarchy(this.tree, this.currentHierarchy);
    if (this.currentGroup) {
      this.currentTree = this.currentGroup.children;
    } else {
      this.currentTree = this.tree;
    }
    this.reassignSeletion();
  }

  onSelect(item: TreeItem): void {
    if (item.isGroup) {
      this.currentHierarchy = [...this.currentHierarchy, item.id];
      this.currentGroup = item;
      this.currentTree = item.children;
      this.reassignSeletion();
    } else {
      this.selectEvent.emit(item.id);
    }
  }

  onDrag(event: CdkDragDrop<unknown>): void {
    if (event.previousIndex === event.currentIndex) { return; }
    this.moveEvent.emit({ hierarchy: this.currentHierarchy, from: event.previousIndex, to: event.currentIndex });
  }

  private revertProperties(): void {
    this.currentTree = undefined;
    this.currentGroup = undefined;
    this.currentHierarchy = [];
  }

  private rebuildTree(): void {
    if (!this.tree) { this.revertProperties(); return; }
    let currentTree = this.tree;
    let currentGroup: TreeGroup | undefined;
    const traversedHierarchy: TreeHierarchy = [];
    for (const id of this.currentHierarchy) {
      const childGroup = currentTree.find((item) => item.id === id && item.isGroup);
      if (!childGroup || !childGroup.isGroup) {
        break;
      }
      currentGroup = childGroup;
      currentTree = childGroup.children;
      traversedHierarchy.push(id);
    }
    this.currentTree = currentTree;
    this.currentGroup = currentGroup;
    this.currentHierarchy = traversedHierarchy;
    this.reassignSeletion();
  }

  private reassignSeletion(): void {
    if (!this.tree || !this.selectedEntryId) { this.currentSelectionId = undefined; return; }
    const selectionHierarchy = findHierarchyInTree(this.tree, (item) => item.id === this.selectedEntryId);
    if (!selectionHierarchy) { this.currentSelectionId = undefined; return; }
    for (const [index, id] of selectionHierarchy.entries()) {
      if (index < this.currentHierarchy.length) {
        if (this.currentHierarchy[index] !== id) { this.currentSelectionId = undefined; return; }
      } else {
        this.currentSelectionId = id;
        return;
      }
    }
  }

  private redirectSelection(): void {
    if (!this.tree || !this.selectedEntryId) { return; }
    const selectionHierarchy = findHierarchyInTree(this.tree, (item) => item.id === this.selectedEntryId);
    if (!selectionHierarchy) { return; }
    this.currentHierarchy = selectionHierarchy.slice(0, -1);
    this.currentGroup = getGroupAtHierarchy(this.tree, this.currentHierarchy);
    this.currentTree = this.currentGroup?.children || this.tree;
    this.reassignSeletion();
  }

  trackById(index: number, item: TreeItem): string {
    return item.id;
  }
}
