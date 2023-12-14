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
import { Observable } from 'rxjs';
import { ProfilePageComponent } from 'src/app/shared/profile-page/profile-page.component';

class mockSocket {
  on(event: String): Observable<any> {
    return new Observable();
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
      'getCareer': Promise.resolve([])
    });

    await TestBed.configureTestingModule({
      imports: [FormsModule, MatIconModule],
      declarations: [StudentPageComponent, PageSkeletonComponent, ButtonComponent, AlertComponent, PopupComponent, IconComponent, DropdownCheckboxComponent, NotificationsContainerComponent, ProfilePageComponent],
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

  // it('should update canApply property based on applications', async () => {
  //   const proposalIdWithApplication = 1;

  //   const mockApplications = [
  //     { thesisProposalId: proposalIdWithApplication }
  //   ];

  //   apiService.getApplications.and.returnValue(Promise.resolve(mockApplications));

  //   await fixture.whenStable();
      
  //   component.selectProposal(proposalIdWithApplication);
  //   await fixture.whenStable();
  //   expect(component.canApply).toBeFalsy();
  // });
});