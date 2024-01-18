import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { SecretaryRequestsViewComponent } from './secretary-requests-view.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { APIService } from 'src/app/shared/services/api.service';

describe('SecretaryRequestsViewComponent', () => {
  let component: SecretaryRequestsViewComponent;
  let fixture: ComponentFixture<SecretaryRequestsViewComponent>;
  let apiService: jasmine.SpyObj<APIService>;

  beforeEach(async () => {
    apiService = jasmine.createSpyObj('APIService', {
      'getThesisRequests': Promise.resolve([]),
      'getRequest': Promise.resolve([]),
    });

    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [SecretaryRequestsViewComponent],
      providers: [{ provide: APIService, useValue: apiService }]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SecretaryRequestsViewComponent);
    component = fixture.componentInstance;
    await fixture.whenStable(),
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should handle successful API response in ngOnInit', fakeAsync(() => {
    const response = [{ coSupervised: false }];
    apiService.getThesisRequests.and.returnValue(Promise.resolve(response));

    component.ngOnInit();
    tick();

    expect(apiService.getThesisRequests).toHaveBeenCalled();
    expect(component.requests).toEqual(response);
  }));

  it('should handle undefined API response in ngOnInit', fakeAsync(() => {
    apiService.getThesisRequests.and.returnValue(Promise.resolve(undefined));

    component.ngOnInit();
    tick();

    expect(apiService.getThesisRequests).toHaveBeenCalled();
    expect(component.requests).toEqual([]);
  }));

  it('should handle error in API response in ngOnInit', fakeAsync(() => {
    const error = 'Error fetching data';
    apiService.getThesisRequests.and.returnValue(Promise.reject(error));

    spyOn(console, 'log');

    component.ngOnInit();
    tick();

    expect(apiService.getThesisRequests).toHaveBeenCalled();
    expect(component.requests).toEqual([]);
    expect(console.log).toHaveBeenCalledWith(error);
  }));

  it('should emit selectedRequestUpdate on successful API call in selectRequest method', fakeAsync(() => {
    const apiResponse = {
      thesisRequestId: 1,
      title: 'Mock Thesis Title',
      coSupervisors: ['Mock Supervisor 1', 'Mock Supervisor 2'],
      message: 'Mock message',
      date: '2024-01-18T12:00:00Z',
      approvalDate: '2024-01-19T08:30:00Z',
      professorStatus: 'Approved',
      secretaryStatus: 'Pending',
    };
    apiService.getRequest.and.returnValue(Promise.resolve(apiResponse));

    const emitSpy = spyOn(component.selectedRequestUpdate, 'emit');

    component.selectRequest({ thesisRequestId: 1 });

    tick();

    expect(apiService.getRequest).toHaveBeenCalledWith(1);
    expect(emitSpy).toHaveBeenCalledWith({
      proposal: {
        thesisRequestId: 1,
        title: 'Mock Thesis Title',
        coSupervisors: ['Mock Supervisor 1', 'Mock Supervisor 2'],
        message: 'Mock message',
        date: '2024-01-18T12:00:00Z',
        approvalDate: '2024-01-19T08:30:00Z',
        professorStatus: 'Approved',
        secretaryStatus: 'Pending',
        coSupervisor: ['Mock Supervisor 1', 'Mock Supervisor 2'],
      },
      message: 'Mock message',
      date: '2024-01-18T12:00:00Z',
      approvalDate: '2024-01-19T08:30:00Z',
      professorStatus: 'Approved',
      secretaryStatus: 'Pending',
    });
  }));

  it('should handle error on selectRequest', async () => {
    const mockError = 'Test Error';

    apiService.getRequest.and.returnValue(Promise.reject(mockError));

    let res = await component.selectRequest({ thesisRequestId: 1 });

    expect(res).toBeUndefined();
  });
});
