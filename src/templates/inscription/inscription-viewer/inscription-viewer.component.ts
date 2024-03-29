import { Component, EventEmitter, Input, OnChanges, OnDestroy, Output, SimpleChanges } from '@angular/core';
import { from, Observable, of, Subscription } from 'rxjs';
import { map, mergeMap, toArray } from 'rxjs/operators';

import { InscriptionLinkEvaluator } from '../inscription.model';

interface InscriptionLineParts {
  linkPart?: string;
  linkInvalid?: boolean;
  linkRef?: string[];
  textPart: string;
}

interface InscriptionLine {
  parts: InscriptionLineParts[];
}

interface InscriptionElements {
  lines: InscriptionLine[];
}

@Component({
  selector: 'lxs-inscription-viewer',
  templateUrl: './inscription-viewer.component.html',
  styleUrls: ['./inscription-viewer.component.scss'],
})
export class InscriptionViewerComponent implements OnChanges, OnDestroy {

  @Input() value?: string;
  @Input() linkEvaluator?: InscriptionLinkEvaluator;
  @Input() linkPreferredSource?: string;
  @Output() selectedInvalidLink = new EventEmitter<string>();
  elements?: InscriptionElements;
  private subscriptions = new Subscription();

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.value || changes.linkEvaluator) {
      this.subscriptions.add(this.makeInscriptionElements(this.value || '').subscribe((elements) => {
        this.elements = elements;
      }));
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  private makeInscriptionLink(expression: string): Observable<Pick<InscriptionLineParts, 'linkPart' | 'linkInvalid' | 'linkRef'>> {
    return (this.linkEvaluator?.evaluate(expression, this.linkPreferredSource) || of(null)).pipe(map((link) => ({
      linkPart: link?.text || expression,
      linkInvalid: !link,
      linkRef: link?.ref,
    })));
  }

  private makeInscriptionLineParts(textPart: string, linkExpression?: string): Observable<InscriptionLineParts> {
    if (linkExpression) {
      return this.makeInscriptionLink(linkExpression).pipe(map((link) => ({
        ...link,
        textPart,
      })));
    } else {
      return of({
        textPart,
      });
    }
  }

  private makeInscriptionLine(line: string): Observable<InscriptionLine> {
    if (line) {
      return from(line.split('[')).pipe(
        mergeMap((linkOpenAttempt, index) => {
          if (index === 0) {
            return this.makeInscriptionLineParts(linkOpenAttempt);
          }
          const linkCloseAttempt = linkOpenAttempt.split(']');
          if (linkCloseAttempt.length > 1) {
            return this.makeInscriptionLineParts(linkCloseAttempt.slice(1).join(']'), linkCloseAttempt[0]);
          } else {
            return this.makeInscriptionLineParts('[' + linkOpenAttempt);
          }
        }),
        toArray(),
        map((parts) => ({ parts })),
      );
    } else {
      return this.makeInscriptionLineParts('\u00a0').pipe(map((parts) => ({ parts: [parts] })));
    }
  }

  private makeInscriptionElements(text: string): Observable<InscriptionElements> {
    return from(text.split('\n')).pipe(
      mergeMap((line) => this.makeInscriptionLine(line)),
      toArray(),
      map((lines) => ({ lines })),
    );
  }

  clickedLink(event: any, part: InscriptionLineParts): void {
    if (part.linkInvalid && part.linkPart) {
      this.selectedInvalidLink.emit(part.linkPart);
    }
  }
}
