import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideTreeComponent } from './side-tree.component';

describe('SideTreeComponent', () => {
  let component: SideTreeComponent;
  let fixture: ComponentFixture<SideTreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SideTreeComponent ],
    })
      .compileComponents();

    fixture = TestBed.createComponent(SideTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
