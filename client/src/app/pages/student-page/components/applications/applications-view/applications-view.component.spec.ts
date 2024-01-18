import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { ApplicationsViewComponent } from './applications-view.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { APIService } from 'src/app/shared/services/api.service';
import { AlertComponent } from 'src/app/shared/alert/alert.component';
import { PopupComponent } from 'src/app/shared/components/popup-conferma/popup.component';
import { RequestFormComponent } from '../../requests/components/request-form/request-form.component';
import { ButtonComponent } from 'src/app/shared/components/button/button.component';
import { IconComponent } from 'src/app/shared/components/icon/icon.component';
import { FormsModule } from '@angular/forms';
import { DropdownCheckboxComponent } from '../../dropdown-checkbox/dropdown-checkbox.component';

describe('ApplicationViewComponent', () => {
  let component: ApplicationsViewComponent;
  let fixture: ComponentFixture<ApplicationsViewComponent>;
  let apiService: jasmine.SpyObj<APIService>;

  beforeEach(async () => {
    apiService = jasmine.createSpyObj('APIService', {
      'getApplications': Promise.resolve([]),
      'getApplicationById': Promise.resolve([]),
      'getProposal': Promise.resolve([]),
      'getProfessors': Promise.resolve([]),
      'getArchivedProposal': Promise.resolve([]),
      'getCoSupervisors': Promise.resolve([]),
    });

    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, FormsModule],
      declarations: [ApplicationsViewComponent, AlertComponent, PopupComponent, RequestFormComponent, ButtonComponent, IconComponent, DropdownCheckboxComponent],
      providers: [{ provide: APIService, useValue: apiService }]
    }).compileComponents();

    fixture = TestBed.createComponent(ApplicationsViewComponent);
    component = fixture.componentInstance;

    await fixture.whenStable();

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call ngOnInit and fetch applications', fakeAsync(() => {
    spyOn(component, 'ngOnInit').and.callThrough();

    component.ngOnInit();

    fixture.detectChanges();
    tick();

    expect(component.ngOnInit).toHaveBeenCalled();
    expect(apiService.getApplications).toHaveBeenCalled();
    expect(component.applications).toBeDefined();
  }));

  it('should set showPopup to true and fetch proposal details', fakeAsync(() => {
    const mockApplication = { thesisProposalId: 1 };  
    const mockApiResponse = {
      title: 'Mock Title',
      description: 'Mock Description',
      supervisor: { professorId: 'MockProfessorId' }
    };
  
    apiService.getArchivedProposal.and.returnValue(Promise.resolve(mockApiResponse));
    component.newRequest(mockApplication);
  
    expect(component.showPopup).toBe(true);
    tick();
    fixture.detectChanges();
  
    expect(apiService.getArchivedProposal).toHaveBeenCalledWith(mockApplication.thesisProposalId);
    expect(component.selectedApplication).toEqual({
      title: 'Mock Title',
      description: 'Mock Description',
      professorId: 'MockProfessorId'
    });
  }));  

  it('should show success alert and hide after 5 seconds', fakeAsync(() => {
    component.showAlert('success');

    fixture.detectChanges();
    tick(5001);

    expect(component.showInsertSuccessAlert).toBeFalse();
  }));

  it('should show danger alert and hide after 5 seconds', fakeAsync(() => {
    component.showAlert('danger');

    fixture.detectChanges();
    tick(5001);

    expect(component.showDangerAlert).toBeFalse();
  }));

  it('should handle window resize', () => {
    spyOn(component, 'onWindowResize').and.callThrough();

    component.screenWidth = 1024;

    window.dispatchEvent(new Event('resize'));

    expect(component.onWindowResize).toHaveBeenCalled();
    expect(component.screenWidth).toBe(window.innerWidth);
  });

  it('should select application and emit details', fakeAsync(() => {
    const mockApplication = { thesisProposalId: 1, status: 'accepted' };
    const mockProposalResponse = {
      title: 'Mock Title',
      description: 'Mock Description',
      supervisor: { professorId: 'MockProfessorId' }
    };
  
    apiService.getProposal.and.returnValue(Promise.resolve(mockProposalResponse));
  
    spyOn(component.selectedApplicationDetails, 'emit');

    component.selectApplication(mockApplication);
  
    tick();
    fixture.detectChanges();
  
    expect(apiService.getProposal).toHaveBeenCalledWith(mockApplication.thesisProposalId);
  
    expect(component.selectedApplicationDetails.emit).toHaveBeenCalledWith({
      proposal: mockProposalResponse,
      status: mockApplication.status
    });
  }));

  it('should handle error on selectApplication', async () => {
    const mockError = 'Test Error';
    const mockApplication = { thesisProposalId: 1 };

    apiService.getProposal.and.returnValue(Promise.reject(mockError));

    let res = await component.selectApplication(mockApplication);

    expect(res).toBeUndefined();
  });
});
