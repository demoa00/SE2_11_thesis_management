import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltersContainerComponent } from './filters-container.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ButtonComponent } from 'src/app/shared/components/button/button.component';
import { DropdownCheckboxComponent } from '../dropdown-checkbox/dropdown-checkbox.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';

describe('FiltersContainerComponent', () => {
  let component: FiltersContainerComponent;
  let fixture: ComponentFixture<FiltersContainerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, MatDatepickerModule, MatNativeDateModule, MatIconModule],
      declarations: [FiltersContainerComponent, ButtonComponent, DropdownCheckboxComponent]
    });
    fixture = TestBed.createComponent(FiltersContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
