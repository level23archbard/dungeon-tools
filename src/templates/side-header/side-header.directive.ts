import { Directive, TemplateRef } from '@angular/core';

import { ActionComponent } from '../common/action/action.component';

@Directive({ selector: 'ng-template[lxsSideHeaderLabel]' })
export class SideHeaderLabelDirective {
  constructor(public template: TemplateRef<unknown>) {}
}

@Directive({ selector: 'lxs-action[lxsSideHeaderLeft]' })
export class SideHeaderLeftDirective {
  constructor(public action: ActionComponent) {}
}

@Directive({ selector: 'lxs-action[lxsSideHeaderRight]' })
export class SideHeaderRightDirective {
  constructor(public action: ActionComponent) {}
}

@Directive({ selector: 'lxs-action[lxsSideHeaderToolbar]' })
export class SideHeaderToolbarDirective {
  constructor(public action: ActionComponent) {}
}
