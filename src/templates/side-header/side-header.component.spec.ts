import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionComponent } from '../common/action/action.component';
import { SideHeaderComponent } from './side-header.component';
import { SideHeaderLeftDirective } from './side-header.directive';

describe('SideHeaderComponent', () => {
  let component: SideHeaderComponent;
  let fixture: ComponentFixture<SideHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SideHeaderComponent, ActionComponent ],
    })
      .compileComponents();

    fixture = TestBed.createComponent(SideHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('SideHeaderLeftDirective', () => {
    it('should create an instance', () => {
      const directive = new SideHeaderLeftDirective(TestBed.createComponent(ActionComponent).componentInstance);
      expect(directive).toBeTruthy();
    });
  });
});
