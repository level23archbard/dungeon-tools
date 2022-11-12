import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InscriptionViewerComponent } from './inscription-viewer.component';

describe('InscriptionViewerComponent', () => {
  let component: InscriptionViewerComponent;
  let fixture: ComponentFixture<InscriptionViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InscriptionViewerComponent ],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InscriptionViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
