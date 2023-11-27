import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicantsTableComponent } from './applicants-table.component';

describe('ThesisTableComponent', () => {
  let component: ApplicantsTableComponent;
  let fixture: ComponentFixture<ApplicantsTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ApplicantsTableComponent]
    });
    fixture = TestBed.createComponent(ApplicantsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open accept popup and reset state', () => {
    component.acceptPopup = false;
    component.requestAccepted = true;
    component.response = { someData: 'test data' };

    component.openAcceptPopup();

    expect(component.acceptPopup).toBe(true);
    expect(component.requestAccepted).toBe(false);
    expect(component.response).toBeUndefined();
  });

  it('should open reject popup and reset state', () => {
    component.rejectPopup = false;
    component.requestAccepted = false;
    component.response = { someData: 'test data' };

    component.openRejectPopup();

    expect(component.rejectPopup).toBe(true);
    expect(component.requestAccepted).toBe(false);
    expect(component.response).toBeUndefined();
  });

  it('should reset applicant in rejectApplication', () => {
    component.applicant = { nome: 'John Doe', matricola: '12345', titoloTesi: 'Thesis 1' };

    component.rejectApplication();

    expect(component.applicant).toBeUndefined();
  });

  it('should reset applicant in acceptApplication', () => {
    component.applicant = { nome: 'John Doe', matricola: '12345', titoloTesi: 'Thesis 1' };

    component.acceptApplication();

    expect(component.applicant).toBeUndefined();
  });
});
