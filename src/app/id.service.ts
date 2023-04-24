import { Injectable } from '@angular/core';

import { Id } from 'src/common/types';

@Injectable({
  providedIn: 'root',
})
export class IdService {
  constructor() {}

  generate(): Id {
    const options = '0123456789abcdefghjkmnpqrstuwxyz'.split('');
    const optionsLength = options.length;
    const id: string[] = [];
    for (let i = 0; i < 12; i++) {
      id.push(options[Math.floor(Math.random() * optionsLength)]);
    }
    return id.join('');
  }
}
