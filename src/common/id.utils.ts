import { Predicate } from '@angular/core';

import { Id, Identifiable } from './types';

export const byId = <T extends Identifiable>(id: Id): Predicate<T> => (i) => i.id === id;
