import { Component, Input } from '@angular/core';

export interface SideHeaderAction {
  icon: string;
  action: () => void;
}

@Component({
  selector: 'lxs-side-header',
  templateUrl: './side-header.component.html',
  styleUrls: ['./side-header.component.scss'],
})
export class SideHeaderComponent {

  @Input() leftAction?: SideHeaderAction;
  @Input() rightAction?: SideHeaderAction;
  @Input() rightActions?: SideHeaderAction[];
}
