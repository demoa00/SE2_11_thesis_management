import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicantsTableComponent } from './applicants-table.component';

describe('ThesisTableComponent', () => {
  let component: ApplicantsTableComponent;
  let fixture: ComponentFixture<ApplicantsTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ApplicantsTableComponent]
    });
    fixture = TestBed.createComponent(ApplicantsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
