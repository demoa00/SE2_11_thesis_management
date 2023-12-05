import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { ApplicantsTableComponent } from './applicants-table.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { APIService } from 'src/app/shared/services/api.service';

describe('ApplicantsTableComponent', () => {
  let component: ApplicantsTableComponent;
  let fixture: ComponentFixture<ApplicantsTableComponent>;
  let apiServiceSpy: jasmine.SpyObj<APIService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('APIService', ['putApplication']);
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ApplicantsTableComponent],
      providers: [{ provide: APIService, useValue: spy }]
    });
    fixture = TestBed.createComponent(ApplicantsTableComponent);
    component = fixture.componentInstance;
    apiServiceSpy = TestBed.inject(APIService) as jasmine.SpyObj<APIService>;
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

  // it('should reset applicant in rejectApplication', fakeAsync(() => {
  //   const mockApplicant = { studentId: '123', thesisProposalId: '456' };
  //   component.applicant = mockApplicant;

  //   apiServiceSpy.putApplication.and.returnValue(Promise.resolve({}));

  //   component.rejectApplication();
  //   fixture.detectChanges();
  //   tick();

  //   expect(apiServiceSpy.putApplication).toHaveBeenCalledWith(mockApplicant.studentId, mockApplicant.thesisProposalId, 'Rejected');
  //   expect(component.requestAccepted).toBe(true);
  //   expect(component.applicant).toBeUndefined();
  // }));

  // it('should reset applicant in acceptApplication', fakeAsync(() => {
  //   const mockApplicant = { studentId: '123', thesisProposalId: '456' };
  //   component.applicant = mockApplicant;

  //   apiServiceSpy.putApplication.and.returnValue(Promise.resolve({}));

  //   component.acceptApplication();
  //   fixture.detectChanges();
  //   tick();

  //   expect(apiServiceSpy.putApplication).toHaveBeenCalledWith(mockApplicant.studentId, mockApplicant.thesisProposalId, 'Accepted');
  //   expect(component.requestAccepted).toBe(true);
  //   expect(component.applicant).toBeUndefined();
  // }));
});
