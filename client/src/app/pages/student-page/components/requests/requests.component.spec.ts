import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestsComponent } from './requests.component';
import { ButtonComponent } from 'src/app/shared/components/button/button.component';
import { PopupComponent } from 'src/app/shared/components/popup-conferma/popup.component';
import { RequestFormComponent } from './components/request-form/request-form.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { IconComponent } from 'src/app/shared/components/icon/icon.component';
import { FormsModule } from '@angular/forms';
import { APIService } from 'src/app/shared/services/api.service';
import { AlertComponent } from 'src/app/shared/alert/alert.component';

describe('RequestsComponent', () => {
  let component: RequestsComponent;
  let fixture: ComponentFixture<RequestsComponent>;
  let apiService: jasmine.SpyObj<APIService>;

  beforeEach(async () => {
    apiService = jasmine.createSpyObj('APIService', {
      'getThesisRequests': Promise.resolve([]),
      'deleteThesisRequest': Promise.resolve([]),
    })

    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, FormsModule],
      declarations: [RequestsComponent, ButtonComponent, PopupComponent, RequestFormComponent, IconComponent, AlertComponent],
      providers: [{ provide: APIService, useValue: apiService }]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RequestsComponent);
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
});
