export type Id = string;

export interface Identifiable {
  id: Id;
}

export interface Entry extends Identifiable {
  name: string;
}

export type Entries = Entry[];

export interface TreeEntry extends Entry {
  isGroup?: false;
}

export interface TreeGroup extends Entry {
  isGroup: true;
  children: TreeList;
}

export type TreeItem = TreeEntry | TreeGroup;

export type TreeList = TreeItem[];

export type TreeHierarchy = Id[];
