import { Component, Input } from '@angular/core';

@Component({
  selector: 'lxs-side-listing',
  templateUrl: './side-listing.component.html',
  styleUrls: ['./side-listing.component.scss'],
})
export class SideListingComponent {

  @Input() label!: string;

  entries: any[] = [
    {id: 0, name: 'asdf'},
    {id: 1, name: 'asdf'},
    {id: 2, name: 'asdf'},
    {id: 3, name: 'asdf'},
    {id: 4, name: 'asdf'},
    {id: 5, name: 'asdf'},
    {id: 6, name: 'asdf'},
    {id: 7, name: 'asdf'},
    {id: 8, name: 'asdf'},
    {id: 9, name: 'asdf'},
    {id: 10, name: 'asdf'},
    {id: 11, name: 'asdf'},
  ];
  activeEntryId = '';

  onClickAdd(): void {}

  onClickEntry(entry: any): void {}
}
