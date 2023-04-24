import { Predicate } from '@angular/core';

import { byId } from './id.utils';
import { Entries, TreeEntry, TreeGroup, TreeHierarchy, TreeItem, TreeList } from './types';

export const itemIsGroup = (item: TreeItem): item is TreeGroup => !!item.isGroup;
export const itemIsEntry = (item: TreeItem): item is TreeEntry => !item.isGroup;

export const getGroupAtHierarchy = (tree: TreeList, hierarchy: TreeHierarchy): TreeGroup | undefined => {
  let currentTree = tree;
  let currentGroup: TreeGroup | undefined;
  for (const id of hierarchy) {
    currentGroup = currentTree.filter(itemIsGroup).find(byId(id));
    if (!currentGroup) { break; }
    currentTree = currentGroup.children;
  }
  return currentGroup;
};

export const findInTree = (tree: TreeList, predicate: Predicate<TreeItem>): TreeItem | undefined => {
  let item = tree.find(predicate);
  if (item) { return item; }
  for (const group of tree.filter(itemIsGroup)) {
    item = findInTree(group.children, predicate);
    if (item) { return item; }
  }
  return undefined;
};

export const findSubtreeInTree = (tree: TreeList, predicate: Predicate<TreeItem>): TreeList | undefined => {
  if (tree.some(predicate)) { return tree; }
  for (const group of tree.filter(itemIsGroup)) {
    const subtree = findSubtreeInTree(group.children, predicate);
    if (subtree) { return subtree; }
  }
  return undefined;
};

export const findHierarchyInTree = (tree: TreeList, predicate: Predicate<TreeItem>): TreeHierarchy | undefined => {
  const item = tree.find(predicate);
  if (item) { return [item.id]; }
  for (const group of tree.filter(itemIsGroup)) {
    const hierarchy = findHierarchyInTree(group.children, predicate);
    if (hierarchy) { return [group.id, ...hierarchy]; }
  }
  return undefined;
};

export const flatTree = (tree: TreeList): Entries => {
  const entries: Entries = [];
  entries.push(...tree.filter(itemIsEntry));
  for (const group of tree.filter(itemIsGroup)) {
    entries.push(...flatTree(group.children));
  }
  return entries;
};
