import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { ThesisRequestsTableComponent } from './thesis-requests-table.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { APIService } from 'src/app/shared/services/api.service';

describe('ThesisRequestsTableComponent', () => {
  let component: ThesisRequestsTableComponent;
  let fixture: ComponentFixture<ThesisRequestsTableComponent>;
  let apiService: jasmine.SpyObj<APIService>;

  beforeEach(async () => {
    apiService = jasmine.createSpyObj('APIService', {
      'getProposal': Promise.resolve([]),
      'getRequest': Promise.resolve([]),
      'putThesisRequest': Promise.resolve([]),
      'getThesisRequests': Promise.resolve([]),
    });

    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ThesisRequestsTableComponent],
      providers: [{ provide: APIService, useValue: apiService }]
    }).compileComponents();

    fixture = TestBed.createComponent(ThesisRequestsTableComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getRequest on shohDetails', async () => {
    const row = { thesisRequestId: 1 };
    const response = {};
    apiService.getRequest.and.returnValue(Promise.resolve(response));
  
    await component.shohDetails(row);
  
    expect(apiService.getRequest).toHaveBeenCalledWith(1);
    expect(component.selectedRequest).toEqual(response);
  });

  it('should open accept popup with actionRequest and reset properties', () => {
    expect(component.acceptPopup).toBeFalsy();
    expect(component.requestAccepted).toBeFalsy();
    expect(component.response).toBeUndefined();

    const mockActionRequest = {};

    component.openAcceptPopup(mockActionRequest);

    expect(component.acceptPopup).toBeTruthy();
    expect(component.requestAccepted).toBeFalsy();
    expect(component.response).toBeUndefined();
    expect(component.actionRequest).toEqual(mockActionRequest);
  });

  it('should open reject popup with actionRequest', () => {
    expect(component.rejectPopup).toBeFalsy();
    expect(component.requestAccepted).toBeFalsy();
    expect(component.response).toBeUndefined();
    expect(component.actionRequest).toBeUndefined();

    const mockActionRequest = {};

    component.openRejectPopup(mockActionRequest);

    expect(component.rejectPopup).toBeTruthy();
    expect(component.requestAccepted).toBeFalsy();
    expect(component.response).toBeUndefined();
    expect(component.actionRequest).toEqual(mockActionRequest);
  });

  it('should open updatePopup with actionRequest', () => {
    const initialUpdatePopupState = component.updatePopup;
    const mockActionRequest = {};
  
    component.openUpdatePopup(mockActionRequest);
  
    expect(component.updatePopup).toBe(!initialUpdatePopupState);
    expect(component.requestAccepted).toBeFalsy();
    expect(component.response).toBeUndefined();
    expect(component.actionRequest).toEqual(mockActionRequest);
  });

  it('should accept thesis request successfully', fakeAsync(async () => {
    const professor = { professorId: 1 };
    const mockResponse = {};
    const actionRequest = { supervisor: { professorId: 2 }, thesisRequestId: 123 };

    component.actionRequest = actionRequest;
  
    apiService.putThesisRequest.and.returnValue(Promise.resolve(mockResponse));
    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(professor));
  
    await component.acceptThesisRequest();
  
    expect(apiService.putThesisRequest).toHaveBeenCalledWith(2, 123, 'Accepted');
    expect(apiService.getThesisRequests).toHaveBeenCalled();
    expect(component.requestAccepted).toBe(true);
    expect(component.actionRequest).toBeUndefined();
  }));

  it('should reject thesis request successfully', fakeAsync(() => {
    component.actionRequest = { thesisRequestId: '123', supervisor: { professorId: '456' } };

    apiService.putThesisRequest.and.returnValue(Promise.resolve([]));

    component.rejectThesisRequest();
    tick();

    expect(apiService.putThesisRequest).toHaveBeenCalledWith('456', '123', 'Rejected');
    expect(component.rows).toBeTruthy();
    expect(component.requestAccepted).toBeTruthy();
    expect(component.actionRequest).toBeUndefined();
  }));

  it('should update thesis request successfully', fakeAsync(() => {
    const mockResponse = [] as any;

    apiService.putThesisRequest.and.returnValue(Promise.resolve(mockResponse));

    const updateText = 'Updated text';
    component.actionRequest = { thesisRequestId: '123', supervisor: { professorId: '456' } };

    component.updateThesisRequest(updateText);

    expect(apiService.putThesisRequest).toHaveBeenCalledWith('456', '123', 'Change', updateText);

    tick();

    expect(component.rows).toEqual(mockResponse);
    expect(component.requestAccepted).toBeTrue();
    expect(component.actionRequest).toBeUndefined();
  }));
});
