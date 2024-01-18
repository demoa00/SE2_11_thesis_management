import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProposalDetailsComponent } from './proposal-details.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ButtonComponent } from 'src/app/shared/components/button/button.component';
import { AlertComponent } from 'src/app/shared/alert/alert.component';
import { APIService } from 'src/app/shared/services/api.service';

describe('ProposalDetailsComponent', () => {
  let component: ProposalDetailsComponent;
  let fixture: ComponentFixture<ProposalDetailsComponent>;
  let apiService: jasmine.SpyObj<APIService>;

  beforeEach(async () => {
    apiService = jasmine.createSpyObj('APIService', {
      'getUserDetails': Promise.resolve([]),
      'insertNewApplication': Promise.resolve([]),
      'getApplications': Promise.resolve([]),
      'getStudentDetails': Promise.resolve([]),
    });

    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ProposalDetailsComponent, ButtonComponent, AlertComponent],
      providers: [{ provide: APIService, useValue: apiService }],
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProposalDetailsComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize user details and set canApply for a student with applications', async () => {
    const mockUser = { userId: 123, role: 'student' };
    const mockStudentDetails = {};
    const mockApplications = [
      { id: 1, status: 'Pending' },
      { id: 2, status: 'Accepted' },
      { id: 3, status: 'Rejected' },
    ];
  
    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(mockUser));
    apiService.getStudentDetails.and.returnValue(Promise.resolve(mockStudentDetails));
    apiService.getApplications.and.returnValue(Promise.resolve(mockApplications));
  
    await component.ngOnInit();
    fixture.detectChanges();
  
    expect(localStorage.getItem).toHaveBeenCalledWith('user');
    expect(component.user).toEqual(mockUser as any);
    expect(apiService.getStudentDetails).toHaveBeenCalledWith(mockUser.userId);
    expect(apiService.getApplications).toHaveBeenCalled();
    expect(component.canApply).toBeFalse();
  });

  it('should apply successfully with file and message', async () => {
    component.applicationMessage = 'Test Message';
    component.applicationFile = new File([''], 'test.txt');

    apiService.insertNewApplication.and.returnValue(Promise.resolve());
    let toggleSpy = spyOn(component, 'togglePopup');

    await component.apply();

    expect(apiService.insertNewApplication).toHaveBeenCalledOnceWith(jasmine.any(FormData));
    expect(component.canApply).toBeFalsy();
    expect(toggleSpy).toHaveBeenCalled();
    expect(component.applicationMessage).toBe('');
    expect(component.applicationFile).toBeNull();
    expect(component.showSuccessAlert).toBe(true);
  });

  it('should handle error when application fails', async () => {
    const mockError = 'Test Error';

    apiService.insertNewApplication.and.returnValue(Promise.reject(mockError));

    let res = await component.apply();

    expect(res).toBeUndefined();
  });

  it('should set applicationFile when a file is selected', () => {
    const fakeFile = new File(['fake content'], 'fake-file.txt', { type: 'text/plain' });
    const event = {
      target: {
        files: {
          item: () => fakeFile,
        },
      },
    } as any;

    component.selectFile(event);

    expect(component.applicationFile).toEqual(fakeFile);
  });

  it('should emit null when proposalId is -1', () => {
    spyOn(component.selectedProposalUpdate, 'emit');

    component.selectProposal(-1);

    expect(component.selectedProposalUpdate.emit).toHaveBeenCalledWith(null);
  });

  it('should toggle popupVisible', () => {
    expect(component.popupVisible).toBeFalse();
  
    component.togglePopup();
    expect(component.popupVisible).toBeTrue();
  
    component.togglePopup();
    expect(component.popupVisible).toBeFalse();
  });
});
