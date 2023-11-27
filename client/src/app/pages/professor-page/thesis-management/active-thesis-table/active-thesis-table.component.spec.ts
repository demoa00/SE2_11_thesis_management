import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveThesisTableComponent } from './active-thesis-table.component';

describe('ActiveThesisTableComponent', () => {
  let component: ActiveThesisTableComponent;
  let fixture: ComponentFixture<ActiveThesisTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ActiveThesisTableComponent]
    });
    fixture = TestBed.createComponent(ActiveThesisTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
