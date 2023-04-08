import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'lxs-app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss'],
})
export class AppHeaderComponent {

  @Output() clickDice = new EventEmitter<void>();
  @Output() clickSettings = new EventEmitter<void>();
}
