import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateThesisFormComponent } from './update-thesis-form.component';

describe('UpdateThesisFormComponent', () => {
  let component: UpdateThesisFormComponent;
  let fixture: ComponentFixture<UpdateThesisFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateThesisFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateThesisFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
