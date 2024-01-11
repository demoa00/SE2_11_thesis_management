import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThesisRequestsTableComponent } from './thesis-requests-table.component';

describe('ThesisRequestsTableComponent', () => {
  let component: ThesisRequestsTableComponent;
  let fixture: ComponentFixture<ThesisRequestsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThesisRequestsTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ThesisRequestsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
