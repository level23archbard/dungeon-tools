import { Observable } from 'rxjs';

export interface ExportedData {
  noteEntries: {
    id: string;
    name: string;
    link: string;
  }[];
  notes: Record<string, string>;
}

export interface ExportableService {
  exportInto(data: ExportedData): Observable<ExportedData>;
  validateImport(data: ExportedData): Observable<boolean>;
  importFrom(data: ExportedData): Observable<void>;
}
