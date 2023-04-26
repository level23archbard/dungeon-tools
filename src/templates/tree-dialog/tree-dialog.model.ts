import { TreeHierarchy, TreeList } from 'src/common/types';

export interface TreeDialogData {
  tree: TreeList;
  currentHierarchy: TreeHierarchy;
  message: string;
  rootLabel: string;
}
