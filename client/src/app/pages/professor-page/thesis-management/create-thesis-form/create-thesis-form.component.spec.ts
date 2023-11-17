import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateThesisFormComponent } from './create-thesis-form.component';

describe('CreateThesisFormComponent', () => {
  let component: CreateThesisFormComponent;
  let fixture: ComponentFixture<CreateThesisFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateThesisFormComponent]
    });
    fixture = TestBed.createComponent(CreateThesisFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
