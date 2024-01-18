import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestsViewComponent } from './requests-view.component';
import { ButtonComponent } from 'src/app/shared/components/button/button.component';
import { PopupComponent } from 'src/app/shared/components/popup-conferma/popup.component';
import { RequestFormComponent } from '../components/request-form/request-form.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { IconComponent } from 'src/app/shared/components/icon/icon.component';
import { FormsModule } from '@angular/forms';
import { APIService } from 'src/app/shared/services/api.service';
import { AlertComponent } from 'src/app/shared/alert/alert.component';

describe('RequestsComponent', () => {
  let component: RequestsViewComponent;
  let fixture: ComponentFixture<RequestsViewComponent>;
  let apiService: jasmine.SpyObj<APIService>;

  beforeEach(async () => {
    apiService = jasmine.createSpyObj('APIService', {
      'getThesisRequests': Promise.resolve([]),
      'deleteThesisRequest': Promise.resolve([]),
      'getRequest': Promise.resolve([]),
    })

    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, FormsModule],
      declarations: [RequestsViewComponent, ButtonComponent, PopupComponent, RequestFormComponent, IconComponent, AlertComponent],
      providers: [{ provide: APIService, useValue: apiService }]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequestsViewComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch thesis requests on ngOnInit', async () => {
    const responseData = [{ coSupervised: false }];
    apiService.getThesisRequests.and.returnValue(Promise.resolve(responseData));

    await component.ngOnInit();

    expect(apiService.getThesisRequests).toHaveBeenCalled();
    expect(component.requests).toEqual(responseData);
  });

  it('should handle error on ngOnInit', async () => {
    const mockError = 'Test Error';

    apiService.getThesisRequests.and.returnValue(Promise.reject(mockError));

    let result = await component.ngOnInit();

    expect(result).toBeUndefined();
  });

  it('should show insert success alert on success', async () => {
    const responseData = [{ coSupervised: false }];
    apiService.getThesisRequests.and.returnValue(Promise.resolve(responseData));

    spyOn(window, 'setTimeout');

    await component.showAlert('success');

    expect(apiService.getThesisRequests).toHaveBeenCalled();
    expect(component.requests).toEqual(responseData);
    expect(component.showInsertSuccessAlert).toBeTrue();
    expect(window.setTimeout).toHaveBeenCalled();
  });

  it('should show danger alert on error', async () => {
    const mockError = 'Test Error';

    apiService.getThesisRequests.and.returnValue(Promise.reject(mockError));

    spyOn(window, 'setTimeout');

    await component.showAlert('danger');

    expect(component.showDangerAlert).toBeTrue();
    expect(window.setTimeout).toHaveBeenCalled();
  });

  it('should update screenWidth on window resize', () => {
    const newWidth = 800;
    (window as any).innerWidth = newWidth;
    component.onWindowResize();

    expect(component.screenWidth).toEqual(newWidth);
  });

  it('should set requestToDelete and show delete popup on selectRequestToDelete', () => {
    const mockRequest = { thesisRequestId: 1 };

    component.selectRequestToDelete(mockRequest);

    expect(component.requestToDelete).toEqual(mockRequest);

    expect(component.showDeletePopup).toBe(true);
  });

  it('should delete a thesis request', async () => {
    const requestToDelete = { thesisRequestId: 1 };

    apiService.deleteThesisRequest.and.returnValue(Promise.resolve({}));

    apiService.getThesisRequests.and.returnValue(Promise.resolve([]));

    component.requestToDelete = requestToDelete;

    await component.deleteRequest();

    expect(apiService.deleteThesisRequest).toHaveBeenCalledWith(requestToDelete.thesisRequestId);

    expect(apiService.getThesisRequests).toHaveBeenCalled();

    expect(component.requests).toEqual([]);

    expect(component.showDeletePopup).toBeFalsy();
  });

  it('should handle error on deleteRequest', async () => {
    const mockError = 'Test Error';
    const requestToDelete = { thesisRequestId: 1 };

    apiService.deleteThesisRequest.and.returnValue(Promise.reject(mockError));
    component.requestToDelete = requestToDelete;

    let res = await component.deleteRequest();

    expect(res).toBeUndefined();
  });

  it('should handle error on deleteRequest 2', async () => {
    const mockError = 'Test Error';
    const requestToDelete = { thesisRequestId: 1 };

    apiService.deleteThesisRequest.and.returnValue(Promise.resolve({}));
    apiService.getThesisRequests.and.returnValue(Promise.reject(mockError));
    component.requestToDelete = requestToDelete;

    let res = await component.deleteRequest();

    expect(res).toBeUndefined();
  });

  it('should emit selectedRequest event on selectRequest', async () => {
    const mockRequest = { thesisRequestId: 1 };
    const mockResponse = {
      title: 'Test Title',
      description: 'Test Description',
      supervisor: 'Test Supervisor',
      coSupervisor: undefined,
      message: 'Test Message',
      date: '2024-01-17',
      approvalDate: '2024-01-18',
      professorStatus: 'Approved',
      secretaryStatus: undefined
    };
  
    apiService.getRequest.and.returnValue(Promise.resolve(mockResponse));
  
    spyOn(component.selectedRequest, 'emit');
  
    await component.selectRequest(mockRequest);
  
    expect(apiService.getRequest).toHaveBeenCalledWith(mockRequest.thesisRequestId);
  
    expect(component.selectedRequest.emit).toHaveBeenCalledWith({
      proposal: {
        title: mockResponse.title,
        description: mockResponse.description,
        supervisor: mockResponse.supervisor,
        coSupervisor: mockResponse.coSupervisor,
      },
      message: mockResponse.message,
      date: mockResponse.date,
      approvalDate: mockResponse.approvalDate,
      professorStatus: mockResponse.professorStatus,
      secretaryStatus: mockResponse.secretaryStatus
    });
  });
  
  it('should handle error on selectRequest', async () => {
    const mockError = 'Test Error';
    const mockRequest = { thesisRequestId: 1 };

    apiService.getRequest.and.returnValue(Promise.reject(mockError));

    let res = await component.selectRequest(mockRequest);

    expect(res).toBeUndefined();
  });

  it('should set requestToEdit and show edit popup on editRequest', async () => {
    const mockRequest = { thesisRequestId: 1 };
  
    const mockResponse = {
      title: 'Test Title',
      description: 'Test Description',
      supervisor: 'Test Supervisor',
      coSupervisors: ['CoSupervisor1', 'CoSupervisor2'],
      message: 'Test Message',
      date: '2024-01-17',
      approvalDate: '2024-01-18',
      professorStatus: 'Approved'
    };
  
    apiService.getRequest.and.returnValue(Promise.resolve(mockResponse));
  
    await component.editRequest(mockRequest);
  
    expect(apiService.getRequest).toHaveBeenCalledWith(mockRequest.thesisRequestId);
  
    expect(component.requestToEdit).toEqual(mockResponse);
  
    expect(component.showEditPopup).toBe(true);
  });

  it('should handle error on editRequest', async () => {
    const mockError = 'Test Error';
    const mockRequest = { thesisRequestId: 1 };

    apiService.getRequest.and.returnValue(Promise.reject(mockError));

    let res = await component.editRequest(mockRequest);

    expect(res).toBeUndefined();
  });

  it('should handle error on showAlert', async () => {
    const mockError = 'Test Error';
    const mockType = 'success';

    apiService.getThesisRequests.and.returnValue(Promise.reject(mockError));

    let res = await component.showAlert(mockType);

    expect(res).toBeUndefined();
  });
});
