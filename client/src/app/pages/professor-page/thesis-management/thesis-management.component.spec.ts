import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThesisManagementComponent } from './thesis-management.component';

describe('ThesisManagementComponent', () => {
  let component: ThesisManagementComponent;
  let fixture: ComponentFixture<ThesisManagementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ThesisManagementComponent]
    });
    fixture = TestBed.createComponent(ThesisManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
