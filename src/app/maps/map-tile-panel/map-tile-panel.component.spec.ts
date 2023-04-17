import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapTilePanelComponent } from './map-tile-panel.component';

describe('MapTilePanelComponent', () => {
  let component: MapTilePanelComponent;
  let fixture: ComponentFixture<MapTilePanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MapTilePanelComponent ],
    })
      .compileComponents();

    fixture = TestBed.createComponent(MapTilePanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
