import { Component, ContentChild, ContentChildren, QueryList } from '@angular/core';

import {
  SideHeaderLabelDirective,
  SideHeaderLeftDirective,
  SideHeaderRightDirective,
  SideHeaderToolbarDirective,
} from './side-header.directive';

@Component({
  selector: 'lxs-side-header',
  templateUrl: './side-header.component.html',
  styleUrls: ['./side-header.component.scss'],
})
export class SideHeaderComponent {

  @ContentChild(SideHeaderLabelDirective) label?: SideHeaderLabelDirective;
  @ContentChildren(SideHeaderLeftDirective) leftActions!: QueryList<SideHeaderLeftDirective>;
  @ContentChildren(SideHeaderRightDirective) rightActions!: QueryList<SideHeaderRightDirective>;
  @ContentChildren(SideHeaderToolbarDirective) toolbarActions!: QueryList<SideHeaderToolbarDirective>;
}
