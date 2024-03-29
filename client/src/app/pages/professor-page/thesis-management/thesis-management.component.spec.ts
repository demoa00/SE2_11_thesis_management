import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { ThesisManagementComponent } from './thesis-management.component';
import { IconComponent } from 'src/app/shared/components/icon/icon.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PopupComponent } from 'src/app/shared/components/popup-conferma/popup.component';
import { CreateThesisFormComponent } from './create-thesis-form/create-thesis-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { APIService } from 'src/app/shared/services/api.service';
import { of } from 'rxjs';
import { ApplicantsTableComponent } from './applicants-table/applicants-table.component';

describe('ThesisManagementComponent', () => {
  let component: ThesisManagementComponent;
  let fixture: ComponentFixture<ThesisManagementComponent>;
  let apiService: jasmine.SpyObj<APIService>;

  beforeEach(() => {
    apiService = jasmine.createSpyObj('APIService', {
      'getApplications': Promise.resolve([]),
      'getThesisRequests': Promise.resolve([]),
      'getAllActiveTheses': Promise.resolve([]),
      'getAllArchivedTheses': Promise.resolve([]),
      'getAllCoSupervisedActiveTheses': Promise.resolve([]),
      'getCoSupervisedThesisRequests': Promise.resolve([]),
    });
    
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ReactiveFormsModule],
      declarations: [ThesisManagementComponent, IconComponent, PopupComponent, CreateThesisFormComponent, ApplicantsTableComponent],
      providers: [{ provide: APIService, useValue: apiService }]
    });
    fixture = TestBed.createComponent(ThesisManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle createPopup property on OpenCreatePopup', fakeAsync(() => {
    component.openCreatePopup();
    fixture.detectChanges();
    tick();
    expect(component.createPopup).toBeTruthy();

    component.openCreatePopup();
    fixture.detectChanges();
    tick();
    expect(component.createPopup).toBeFalsy();
  }));

  it('should set showApplicants to true and others to false on showApplicantsTable', fakeAsync(() => {
    const mockResponse = [{}];
    apiService.getApplications.and.returnValue(Promise.resolve(mockResponse));
  
    component.showApplicantsTable();
    tick();
    fixture.detectChanges();
  
    expect(component.showApplicants).toBe(true);
    expect(component.showActiveTheses).toBe(false);
    expect(component.showArchivedTheses).toBe(false);
    expect(component.applicantsRow).toEqual(mockResponse);
  }));

  it('should set showApplicants to true and others to false on showApplicantsTable when response is undefined', fakeAsync(() => {
    apiService.getApplications.and.returnValue(Promise.resolve(undefined));
    component.showApplicantsTable();
    tick();
    expect(component.showApplicants).toBe(true);
    expect(component.showActiveTheses).toBe(false);
    expect(component.showArchivedTheses).toBe(false);
    expect(component.applicantsRow).toEqual([]);
  }));

  it('should set showThesisRequests to true and others to false when both responses are defined', fakeAsync(() => {
    const mockResponse1 = [{ coSupervised: false }];
    const mockResponse2 = [{ coSupervised: true }];
    apiService.getThesisRequests.and.returnValue(Promise.resolve(mockResponse1));
    apiService.getCoSupervisedThesisRequests.and.returnValue(Promise.resolve(mockResponse2));
  
    component.showThesisRequestsTable();
    tick();
  
    expect(component.showThesisRequests).toBe(true);
    expect(component.showApplicants).toBe(false);
    expect(component.showActiveTheses).toBe(false);
    expect(component.showArchivedTheses).toBe(false);
    expect(component.thesisRequestsRow).toEqual([...mockResponse1, ...mockResponse2]);
  }));

  it('should set showThesisRequests to true and others to false when only response1 is defined', fakeAsync(() => {
    const mockResponse1 = [{ coSupervised: false }];
    apiService.getThesisRequests.and.returnValue(Promise.resolve(mockResponse1));
    apiService.getCoSupervisedThesisRequests.and.returnValue(Promise.resolve(undefined));
  
    component.showThesisRequestsTable();
    tick();
  
    expect(component.showThesisRequests).toBe(true);
    expect(component.showApplicants).toBe(false);
    expect(component.showActiveTheses).toBe(false);
    expect(component.showArchivedTheses).toBe(false);
    expect(component.thesisRequestsRow).toEqual(mockResponse1);
  }));
  
  it('should set showThesisRequests to true and others to false when only response2 is defined', fakeAsync(() => {
    const mockResponse2 = [{ coSupervised: true }];
    apiService.getThesisRequests.and.returnValue(Promise.resolve(undefined));
    apiService.getCoSupervisedThesisRequests.and.returnValue(Promise.resolve(mockResponse2));
  
    component.showThesisRequestsTable();
    tick();
  
    expect(component.showThesisRequests).toBe(true);
    expect(component.showApplicants).toBe(false);
    expect(component.showActiveTheses).toBe(false);
    expect(component.showArchivedTheses).toBe(false);
    expect(component.thesisRequestsRow).toEqual(mockResponse2);
  }));
  
  it('should set showThesisRequests to true and others to false when both responses are undefined', fakeAsync(() => {
    apiService.getThesisRequests.and.returnValue(Promise.resolve(undefined));
    apiService.getCoSupervisedThesisRequests.and.returnValue(Promise.resolve(undefined));
  
    component.showThesisRequestsTable();
    tick();
  
    expect(component.showThesisRequests).toBe(true);
    expect(component.showApplicants).toBe(false);
    expect(component.showActiveTheses).toBe(false);
    expect(component.showArchivedTheses).toBe(false);
    expect(component.thesisRequestsRow).toEqual([]);
  }));

  it('should set showActiveTheses to true and others to false when responses are defined', fakeAsync(() => {
    const mockResponse1 = [{ title: 'Thesis 1', coSupervised: false }];
    const mockResponse2 = [{ title: 'Thesis 2', coSupervised: true }];
    apiService.getAllActiveTheses.and.returnValue(Promise.resolve(mockResponse1));
    apiService.getAllCoSupervisedActiveTheses.and.returnValue(Promise.resolve(mockResponse2));
  
    component.showActiveThesesTable();
    tick();
  
    expect(component.showApplicants).toBe(false);
    expect(component.showActiveTheses).toBe(true);
    expect(component.showArchivedTheses).toBe(false);
    expect(component.showThesisRequests).toBe(false);
    expect(component.activeThesesRow).toEqual([...mockResponse1, ...mockResponse2]);
  }));
  
  it('should set showActiveTheses to true and others to false when only response1 is defined', fakeAsync(() => {
    const mockResponse1 = [{ title: 'Thesis 1', coSupervised: false }];
    apiService.getAllActiveTheses.and.returnValue(Promise.resolve(mockResponse1));
    apiService.getAllCoSupervisedActiveTheses.and.returnValue(Promise.resolve(undefined));
  
    component.showActiveThesesTable();
    tick();
  
    expect(component.showApplicants).toBe(false);
    expect(component.showActiveTheses).toBe(true);
    expect(component.showArchivedTheses).toBe(false);
    expect(component.showThesisRequests).toBe(false);
    expect(component.activeThesesRow).toEqual(mockResponse1);
  }));
  
  it('should set showActiveTheses to true and others to false when only response2 is defined', fakeAsync(() => {
    const mockResponse2 = [{ title: 'Thesis 2', coSupervised: true }];
    apiService.getAllActiveTheses.and.returnValue(Promise.resolve(undefined));
    apiService.getAllCoSupervisedActiveTheses.and.returnValue(Promise.resolve(mockResponse2));
  
    component.showActiveThesesTable();
    tick();
  
    expect(component.showApplicants).toBe(false);
    expect(component.showActiveTheses).toBe(true);
    expect(component.showArchivedTheses).toBe(false);
    expect(component.showThesisRequests).toBe(false);
    expect(component.activeThesesRow).toEqual(mockResponse2);
  }));
  
  it('should set showActiveTheses to true and others to false when both responses are undefined', fakeAsync(() => {
    apiService.getAllActiveTheses.and.returnValue(Promise.resolve(undefined));
    apiService.getAllCoSupervisedActiveTheses.and.returnValue(Promise.resolve(undefined));
  
    component.showActiveThesesTable();
    tick();
  
    expect(component.showApplicants).toBe(false);
    expect(component.showActiveTheses).toBe(true);
    expect(component.showArchivedTheses).toBe(false);
    expect(component.showThesisRequests).toBe(false);
    expect(component.activeThesesRow).toEqual([]);
  }));  

  it('should set showArchivedTheses to true and others to false when response is defined', fakeAsync(() => {
    const mockResponse = [{}];
    apiService.getAllArchivedTheses.and.returnValue(Promise.resolve(mockResponse));
  
    component.showArchivedThesesTable();
    tick();
  
    expect(component.showApplicants).toBe(false);
    expect(component.showActiveTheses).toBe(false);
    expect(component.showThesisRequests).toBe(false);
    expect(component.showArchivedTheses).toBe(true);
    expect(component.archivedThesesRow).toEqual(mockResponse);
  }));
  
  it('should set showArchivedTheses to true and others to false when response is undefined', fakeAsync(() => {
    apiService.getAllArchivedTheses.and.returnValue(Promise.resolve(undefined));
  
    component.showArchivedThesesTable();
    tick();
  
    expect(component.showApplicants).toBe(false);
    expect(component.showActiveTheses).toBe(false);
    expect(component.showThesisRequests).toBe(false);
    expect(component.showArchivedTheses).toBe(true);
    expect(component.archivedThesesRow).toEqual([]);
  }));

  it('should update all rows when APIs return data', fakeAsync(() => {
    const archivedThesesResponse = [{}];
    const activeThesesResponse = [{ coSupervised: false }];
    const applicationsResponse = [{}];
    const thesisRequestsResponse = [{ coSupervised: false }];
    const coSupervisedThesisRequestsResponse = [{ coSupervised: false }];
  
    apiService.getAllArchivedTheses.and.returnValue(Promise.resolve(archivedThesesResponse));
    apiService.getAllActiveTheses.and.returnValue(Promise.resolve(activeThesesResponse));
    apiService.getApplications.and.returnValue(Promise.resolve(applicationsResponse));
    apiService.getThesisRequests.and.returnValue(Promise.resolve(thesisRequestsResponse));
    apiService.getCoSupervisedThesisRequests.and.returnValue(Promise.resolve(coSupervisedThesisRequestsResponse));
  
    component.updateAll();
    tick();
  
    expect(component.archivedThesesRow).toEqual(archivedThesesResponse);
    expect(component.activeThesesRow).toEqual(activeThesesResponse);
    expect(component.applicantsRow).toEqual(applicationsResponse);
    expect(component.thesisRequestsRow).toEqual([...thesisRequestsResponse, ...coSupervisedThesisRequestsResponse]);
  }));
  
  it('should handle undefined responses from APIs', fakeAsync(() => {
    apiService.getAllArchivedTheses.and.returnValue(Promise.resolve(undefined));
    apiService.getAllActiveTheses.and.returnValue(Promise.resolve(undefined));
    apiService.getApplications.and.returnValue(Promise.resolve(undefined));
    apiService.getThesisRequests.and.returnValue(Promise.resolve(undefined));
    apiService.getCoSupervisedThesisRequests.and.returnValue(Promise.resolve(undefined));
  
    component.updateAll();
    tick();
  
    expect(component.archivedThesesRow).toEqual([]);
    expect(component.activeThesesRow).toEqual([]);
    expect(component.applicantsRow).toEqual([]);
    expect(component.thesisRequestsRow).toEqual([]);
  }));
  
});
