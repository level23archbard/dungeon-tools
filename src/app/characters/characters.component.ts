import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'lxs-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.scss'],
})
export class CharactersComponent implements OnInit {

  entries = [
    {id: '0', name: 'asdf'},
    {id: '1', name: 'asdf'},
    {id: '2', name: 'asdf'},
    {id: '3', name: 'asdf'},
    {id: '4', name: 'asdf'},
    {id: '5', name: 'asdf'},
    {id: '6', name: 'asdf'},
    {id: '7', name: 'asdf'},
    {id: '8', name: 'asdf'},
    {id: '9', name: 'asdf'},
  ];

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
  }
}
