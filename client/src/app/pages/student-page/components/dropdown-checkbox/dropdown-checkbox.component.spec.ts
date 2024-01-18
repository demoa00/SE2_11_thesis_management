import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownCheckboxComponent } from './dropdown-checkbox.component';
import { FormsModule } from '@angular/forms';

describe('DropdownCheckboxComponent', () => {
  let component: DropdownCheckboxComponent;
  let fixture: ComponentFixture<DropdownCheckboxComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [DropdownCheckboxComponent]
    });
    fixture = TestBed.createComponent(DropdownCheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call updateSearchFunction and emit searchedValue event', () => {
    const inputValue = 'testValue';

    component.hover = true;
    component.showSearch = true;
    component.searchValue = 'initialValue';
    fixture.detectChanges();

    const updateSearchFunctionSpy = spyOn(component, 'updateSearchFunction') as any;

    const emitSpy = spyOn(component.searchedValue, 'emit');

    component.updateSearch(inputValue);

    expect(updateSearchFunctionSpy).toHaveBeenCalledWith(inputValue);
    expect(emitSpy).toHaveBeenCalledWith(inputValue.trim().toLowerCase());
  });
});
