import { Overlay } from '@angular/cdk/overlay';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MAT_TOOLTIP_SCROLL_STRATEGY } from '@angular/material/tooltip';

import { itemIsGroup } from 'src/common/tree.utils';
import { Identifiable, TreeGroup, TreeHierarchy } from 'src/common/types';

import { TreeDialogData } from './tree-dialog.model';

@Component({
  selector: 'lxs-tree-dialog',
  templateUrl: './tree-dialog.component.html',
  styleUrls: ['./tree-dialog.component.scss'],
  providers: [
    {
      provide: MAT_TOOLTIP_SCROLL_STRATEGY,
      deps: [Overlay],
      useFactory: (overlay: Overlay) => () => overlay.scrollStrategies.close(),
    },
  ],
})
export class TreeDialogComponent {

  currentHierarchy: TreeHierarchy;
  currentGroup?: TreeGroup;
  currentTree: TreeGroup[] = [];

  currentHierarchyNames: string[] = [];

  constructor(private dialog: MatDialogRef<TreeDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: TreeDialogData) {
    this.currentHierarchy = data.currentHierarchy;
    this.rebuildTree();
  }

  private rebuildTree(): void {
    let currentTree = this.data.tree;
    let currentGroup: TreeGroup | undefined;
    const traversedHierarchy: TreeHierarchy = [];
    const traversedNames: string[] = [];
    for (const id of this.currentHierarchy) {
      const childGroup = currentTree.find((item) => item.id === id && item.isGroup);
      if (!childGroup || !childGroup.isGroup) {
        break;
      }
      currentGroup = childGroup;
      currentTree = childGroup.children;
      traversedHierarchy.push(id);
      traversedNames.push(childGroup.name);
    }
    this.currentTree = currentTree.filter(itemIsGroup);
    this.currentGroup = currentGroup;
    this.currentHierarchy = traversedHierarchy;
    this.currentHierarchyNames = traversedNames;
  }

  onClickGroup(group: TreeGroup): void {
    this.currentHierarchy = [...this.currentHierarchy, group.id];
    this.rebuildTree();
  }

  onClickBack(): void {
    this.currentHierarchy = this.currentHierarchy.slice(0, -1);
    this.rebuildTree();
  }

  onClickCancel(): void {
    this.dialog.close(undefined);
  }

  onClickSubmit(): void {
    this.dialog.close(this.areEqual(this.currentHierarchy, this.data.currentHierarchy.slice(0, -1)) ? undefined : this.currentHierarchy);
  }

  private areEqual(arr1: string[], arr2: string[]): boolean {
    if (arr1.length !== arr2.length) { return false; }
    for (const [idx, item] of arr1.entries()) {
      if (item !== arr2[idx]) { return false; }
    }
    return true;
  }

  trackById(index: number, identifiable: Identifiable): string {
    return identifiable.id;
  }
}
