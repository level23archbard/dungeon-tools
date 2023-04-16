import { Observable } from 'rxjs';

import { NoteData, NoteEntry } from '../notes/notes.model';
import { Settings } from './settings.model';

export interface ExportedData {
  noteEntries: NoteEntry[];
  notes: Record<string, NoteData>;
  settings: Partial<Settings>;
}

export interface ExportableService {
  exportInto(data: ExportedData): Observable<ExportedData>;
  validateImport(data: ExportedData): Observable<boolean>;
  importFrom(data: ExportedData): Observable<void>;
}
