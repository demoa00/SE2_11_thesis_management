import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveThesisTableComponent } from './active-thesis-table.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ActiveThesisTableComponent', () => {
  let component: ActiveThesisTableComponent;
  let fixture: ComponentFixture<ActiveThesisTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ActiveThesisTableComponent]
    });
    fixture = TestBed.createComponent(ActiveThesisTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open create popup and reset state', () => {
    component.createPopup = false;
    component.requestAccepted = true;
    component.response = { someData: 'test data' };

    component.openCreatePopup();

    expect(component.createPopup).toBe(true);
    expect(component.requestAccepted).toBe(false);
    expect(component.response).toBeUndefined();
  });
});
