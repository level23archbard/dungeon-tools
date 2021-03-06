import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { InscriptionLinkEvaluator } from '../inscription-viewer/inscription-viewer.component';

@Component({
  selector: 'lxs-inscription-editor',
  templateUrl: './inscription-editor.component.html',
  styleUrls: ['./inscription-editor.component.scss']
})
export class InscriptionEditorComponent implements OnChanges, OnInit, OnDestroy {

  @Input() value?: string;
  @Output() valueChanged = new EventEmitter<string>();
  @Input() linkEvaluator?: InscriptionLinkEvaluator;
  valueControl = new FormControl('');
  isEditing = true;
  private subscriptions = new Subscription();

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.value) {
      this.valueControl.setValue(changes.value.currentValue);
    }
  }

  ngOnInit(): void {
    this.subscriptions.add(this.valueControl.valueChanges.pipe(
      debounceTime(200),
    ).subscribe((value) => {
      this.value = value;
      this.valueChanged.emit(value);
    }));
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  onClickEditing(): void {
    this.isEditing = !this.isEditing;
  }
}
