import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThesisRequestDetailsComponent } from './thesis-request-details.component';

describe('ThesisRequestDetailsComponent', () => {
  let component: ThesisRequestDetailsComponent;
  let fixture: ComponentFixture<ThesisRequestDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThesisRequestDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThesisRequestDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
