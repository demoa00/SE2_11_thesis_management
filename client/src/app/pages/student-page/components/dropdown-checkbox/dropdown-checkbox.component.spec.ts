import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownCheckboxComponent } from './dropdown-checkbox.component';

describe('DropdownCheckboxComponent', () => {
  let component: DropdownCheckboxComponent;
  let fixture: ComponentFixture<DropdownCheckboxComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DropdownCheckboxComponent]
    });
    fixture = TestBed.createComponent(DropdownCheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
