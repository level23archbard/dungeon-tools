import { Component, EventEmitter, Input, Output, TemplateRef, ViewChild } from '@angular/core';

export type ActionComponentDisplay = keyof Pick<ActionComponent, 'iconButton' | 'smallIconButton'>;

@Component({
  selector: 'lxs-action',
  templateUrl: './action.component.html',
  styleUrls: ['./action.component.scss'],
})
export class ActionComponent {

  @Input() label?: string;
  @Input() icon?: string;
  @Output() action = new EventEmitter();

  @Input() display: ActionComponentDisplay | null = 'iconButton';

  @ViewChild('iconButton', { static: true }) iconButton!: TemplateRef<unknown>;
  @ViewChild('smallIconButton', { static: true }) smallIconButton!: TemplateRef<unknown>;
}
