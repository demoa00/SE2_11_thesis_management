import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThesisTableComponent } from './thesis-table.component';

describe('ThesisTableComponent', () => {
  let component: ThesisTableComponent;
  let fixture: ComponentFixture<ThesisTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ThesisTableComponent]
    });
    fixture = TestBed.createComponent(ThesisTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
