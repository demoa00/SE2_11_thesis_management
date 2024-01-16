import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProposalsViewComponent } from './proposals-view.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ButtonComponent } from 'src/app/shared/components/button/button.component';
import { MatIconModule } from '@angular/material/icon';
import { DropdownCheckboxComponent } from '../../dropdown-checkbox/dropdown-checkbox.component';
import { FiltersContainerComponent } from '../../filters-container/filters-container.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('ProposalsComponent', () => {
  let component: ProposalsViewComponent;
  let fixture: ComponentFixture<ProposalsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, MatIconModule, MatDatepickerModule, MatNativeDateModule, FormsModule, BrowserAnimationsModule],
      declarations: [ProposalsViewComponent, ButtonComponent, DropdownCheckboxComponent, FiltersContainerComponent],
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProposalsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
