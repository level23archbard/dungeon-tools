import { Observable } from 'rxjs';

export interface InscriptionLink {
  text: string;
  ref: string[];
}

export interface InscriptionLinkEvaluator {
  evaluate(tag: string, preferredSource?: string): Observable<InscriptionLink | null>;
}
