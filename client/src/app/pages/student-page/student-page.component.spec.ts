import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { StudentPageComponent } from './student-page.component';
import { APIService } from 'src/app/shared/services/api.service';
import { PageSkeletonComponent } from 'src/app/shared/components/page-skeleton/page-skeleton.component';
import { ButtonComponent } from 'src/app/shared/components/button/button.component';
import { AlertComponent } from 'src/app/shared/alert/alert.component';
import { PopupComponent } from 'src/app/shared/components/popup-conferma/popup.component';
import { IconComponent } from 'src/app/shared/components/icon/icon.component';
import { DropdownCheckboxComponent } from './components/dropdown-checkbox/dropdown-checkbox.component';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { NotificationsContainerComponent } from 'src/app/shared/components/notification/container/notifications-container/notifications-container.component';
import { Socket } from 'ngx-socket-io';
import { Observable, filter, map, Subject } from 'rxjs';
import { ProfilePageComponent } from 'src/app/shared/profile-page/profile-page.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FiltersContainerComponent } from './components/filters-container/filters-container.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

class mockSocket {
  socketSubject = new Subject<any>();

  emit(event: String, data: any): void {
    this.socketSubject.next({ event, data });
  }

  on(event: String): Observable<any> {
    return this.socketSubject.asObservable().pipe(
      filter((message) => message.event === event),
      map((message) => message.data)
    );
  }
}

describe('StudentPageComponent', () => {
  let component: StudentPageComponent;
  let fixture: ComponentFixture<StudentPageComponent>;
  let apiService: jasmine.SpyObj<APIService>;

  beforeEach(async () => {
    apiService = jasmine.createSpyObj('APIService', {
      'setStudent': Promise.resolve([]),
      'getUserDetails': Promise.resolve([]),
      'getAllProposals': Promise.resolve([]),
      'getProfessors': Promise.resolve([]),
      'getApplications': Promise.resolve([]),
      'getProposal': Promise.resolve([]),
      'insertNewApplication': Promise.resolve([]),
      'checkAutorization': Promise.resolve([]),
      'getSupervisors': Promise.resolve([]),
      'getNotifications': Promise.resolve([]),
      'getCareer': Promise.resolve([]),
      'getExternalCoSupervisors': Promise.resolve([]),
      'getCoSupervisors': Promise.resolve([])
    });

    await TestBed.configureTestingModule({
      imports: [FormsModule, MatIconModule, MatDatepickerModule, MatNativeDateModule, NoopAnimationsModule],
      declarations: [StudentPageComponent, PageSkeletonComponent, ButtonComponent, AlertComponent, PopupComponent, IconComponent, DropdownCheckboxComponent, NotificationsContainerComponent, ProfilePageComponent, FiltersContainerComponent],
      providers: [
        { provide: APIService, useValue: apiService },
        { provide: Socket, useClass: mockSocket }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(StudentPageComponent);
    component = fixture.componentInstance;

    await fixture.whenStable();

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle trigger when closeMenu is called', () => {
    expect(component.trigger).toBeFalsy();
  
    component.closeMenu();
  
    expect(component.trigger).toBeTruthy();
  });

  it('should select the menu item', () => {
    expect(component.menuItems[0].selected).toBeTruthy();
    expect(component.menuItems[1].selected).toBeFalsy();

    component.selectMenuItem(1);

    expect(component.menuItems[0].selected).toBeFalsy();
    expect(component.menuItems[1].selected).toBeTruthy();
  });

  it('should update search value', () => {
    expect(component.searchValue).toBe('');

    component.updateSearchValue('test');

    expect(component.searchValue).toBe('test');
  });

  it('should toggle professor selection and update proposals', fakeAsync(() => {
    const mockProf = { id: 1, name: 'John Doe' };

    expect(component.selectedProfs).toEqual([]);
    expect(component.proposalParams.supervisors).toBeNull();

    component.toggleProf(mockProf);
    tick();

    expect(component.selectedProfs).toEqual([mockProf]);
    expect(component.proposalParams.supervisors).toEqual([mockProf]);

    expect(apiService.getAllProposals).toHaveBeenCalledWith(component.proposalParams);
  }));

  it('should toggle professor selection and update proposals 2', fakeAsync(() => {
    const mockProf = { id: 1, name: 'John Doe' };
    component.selectedProfs = [mockProf];

    expect(component.selectedProfs).toEqual([mockProf]);

    component.toggleProf(mockProf);
    tick();

    expect(component.selectedProfs).toEqual([]);
    expect(component.proposalParams.supervisors).toBeNull();

    expect(apiService.getAllProposals).toHaveBeenCalledWith(component.proposalParams);
  }));

  it('should return true if prof is selected', () => {
    const prof = 'Professor Name';
  
    expect(component.selectedProfs.length).toBe(0);
  
    component.toggleProf(prof);
  
    const isProfSelected = component.isProfSelected(prof);
    expect(isProfSelected).toBe(true);
  });

  it('should select a proposal', fakeAsync(() => {
    const proposalId = 1;
    const mockProposal = {};
    
    apiService.getProposal.and.returnValue(Promise.resolve(mockProposal));

    component.selectProposal(proposalId);
    tick();

    expect(apiService.getProposal).toHaveBeenCalledWith(proposalId);
    expect(component.selectedProposal).toEqual(mockProposal);
  }));

  it('should set selected proposal to null with invalid proposalId', () => {
    const proposalId = -1;

    component.selectProposal(proposalId);

    expect(component.selectedProposal).toBeNull();
  });

  it('should search and update proposals', fakeAsync(() => {
    const mockResponse = [{ proposalId: 1, title: 'Test Proposal' }];
    apiService.getAllProposals.and.returnValue(Promise.resolve(mockResponse));
  
    component.searchValue = 'test';
  
    component.search();
    tick();
  
    expect(apiService.getAllProposals).toHaveBeenCalledWith(component.proposalParams);
  }));

  it('should handle search with empty value', fakeAsync(() => {
    const mockResponse = [{ proposalId: 1, title: 'Test Proposal' }];
    apiService.getAllProposals.and.returnValue(Promise.resolve(mockResponse));
  
    component.searchValue = '';
  
    component.search();
    tick();
  
    expect(apiService.getAllProposals).toHaveBeenCalledWith(component.proposalParams);
  }));

  it('should toggle popupVisible when togglePopup is called', () => {
    expect(component.popupVisible).toBeFalsy();
  
    component.togglePopup();
  
    expect(component.popupVisible).toBeTruthy();
  });

  it('should close notifications', () => {
    const mockSocketInstance = TestBed.inject(Socket) as unknown as mockSocket;
  
    component.notificationsOpen = true;
  
    mockSocketInstance.emit('closeNotifications', {});
  
    component.closeNotifications(true);
  
    expect(component.notificationsOpen).toBeFalse();
  });

  it('should navigate to the profile page', () => {
    expect(component.menuItems[0].selected).toBeTruthy();
    expect(component.menuItems[1].selected).toBeFalsy();
    expect(component.profilePage).toBeFalsy();
  
    component.goToProfilePage(true);
  
    expect(component.menuItems[0].selected).toBeFalsy();
    expect(component.menuItems[1].selected).toBeFalsy();
    expect(component.profilePage).toBeTruthy();
  });

  it('should navigate to Applications page', () => {
    const selectMenuItemSpy = spyOn(component, 'selectMenuItem');
  
    component.goToApplicationPage(true);
  
    expect(selectMenuItemSpy).toHaveBeenCalledWith(1);
  
    expect(component.profilePage).toBe(false);
  });

  it('should delete filters and reset properties', fakeAsync(() => {
    component.proposalParams = {
      text: 'SomeText',
      supervisors: [{ id: 1, name: 'John Doe' }],
      cosupervisors: null,
      extCs: null,
      expirationDate: '2022-01-01',
      abroad: true,
    };
    component.selectedProfs = [{ id: 1, name: 'John Doe' }];
    component.searchValue = 'SomeSearchValue';
  
    component.deleteFilters();
    tick();
  
    expect(component.proposalParams).toEqual({
      text: null,
      supervisors: null,
      cosupervisors: null,
      extCs: null,
      expirationDate: null,
      abroad: null,
    });
    expect(component.selectedProfs).toEqual([]);
    expect(component.searchValue).toBe('');
  
    expect(apiService.getAllProposals).toHaveBeenCalledWith(null);
  }));

  it('should apply for a proposal', fakeAsync(() => {
    const proposalId = 1;
    const mockProposal = {
      thesisProposalId: proposalId,
      title: 'Test Proposal'
    };
    const applicationMessage = 'Test application message';
  
    component.selectedProposal = mockProposal;
    component.applicationMessage = applicationMessage;
  
    apiService.insertNewApplication.and.returnValue(Promise.resolve());

    spyOn(component, 'togglePopup');
  
    component.apply();
    tick();
  
    expect(apiService.insertNewApplication).toHaveBeenCalledWith({
      'thesisProposalId': proposalId,
      'thesisProposalTitle': mockProposal.title,
      'applicant': {
        'studentId': component.user?.userId,
        'name': component.userDetails?.name,
        'surname': component.userDetails?.surname,
        'student': `https://localhost:3000${component.userDetails?.self}`
      },
      'message': applicationMessage,
      'date': component.dayjs().format('YYYY-MM-DD'),
    });

    expect(component.canApply).toBe(false);
    expect(component.togglePopup).toHaveBeenCalled();
  
    expect(component.showSuccessAlert).toBe(true);
    tick(3001);
    expect(component.showSuccessAlert).toBe(false);
  }));

  it('should toggle more filters and update proposals accordingly', fakeAsync(() => {
    component.showFilters = true;
    component.proposalParams.cosupervisors = [{ id: 1, name: 'Professor A' }];
    component.proposalParams.extCs = [{ id: 2, name: 'Professor B' }];
    component.proposalParams.expirationDate = '2024-01-07';
  
    component.toggleMoreFilters();
    tick();
  
    expect(component.showFilters).toBe(false);
    expect(component.proposalParams.cosupervisors).toBeNull();
    expect(component.proposalParams.extCs).toBeNull();
    expect(component.proposalParams.expirationDate).toBeNull();
  
    expect(apiService.getAllProposals).toHaveBeenCalledWith(component.proposalParams);
  }));

  it('should toggle showFilters when toggleMoreFilters is called', () => {
    expect(component.showFilters).toBeFalsy();
  
    component.toggleMoreFilters();
  
    expect(component.showFilters).toBeTruthy();
  });
});