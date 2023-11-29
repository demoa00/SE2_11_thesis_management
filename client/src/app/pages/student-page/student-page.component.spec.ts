import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { StudentPageComponent } from './student-page.component';
import { APIService } from 'src/app/shared/services/api.service';
import { PageSkeletonComponent } from 'src/app/shared/components/page-skeleton/page-skeleton.component';
import { ButtonComponent } from 'src/app/shared/components/button/button.component';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { AlertComponent } from 'src/app/shared/alert/alert.component';
import { PopupComponent } from 'src/app/shared/components/popup-conferma/popup.component';
import { IconComponent } from 'src/app/shared/components/icon/icon.component';

describe('StudentPageComponent', () => {
  let component: StudentPageComponent;
  let fixture: ComponentFixture<StudentPageComponent>;
  let apiServiceSpy: jasmine.SpyObj<APIService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('APIService', [
      'setStudent',
      'getUserDetails',
      'getAllProposals',
      'getProfessors',
      'getApplications',
      'getProposal',
      'insertNewApplication',
      'checkAutorization'
    ]);;

    TestBed.configureTestingModule({
      imports: [FormsModule, MatIconModule],
      declarations: [StudentPageComponent, PageSkeletonComponent, ButtonComponent, AlertComponent, PopupComponent, IconComponent],
      providers: [{ provide: APIService, useValue: spy }],
    }).compileComponents();

    fixture = TestBed.createComponent(StudentPageComponent);
    component = fixture.componentInstance;
    apiServiceSpy = TestBed.inject(APIService) as jasmine.SpyObj<APIService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create the component and make API calls on initialization', fakeAsync(() => {
    apiServiceSpy.setStudent.and.returnValue(Promise.resolve());
    apiServiceSpy.getUserDetails.and.returnValue(Promise.resolve());
    apiServiceSpy.getAllProposals.and.returnValue(Promise.resolve());
    apiServiceSpy.getProfessors.and.returnValue(Promise.resolve());
    apiServiceSpy.getApplications.and.returnValue(Promise.resolve());
    apiServiceSpy.checkAutorization.and.returnValue();

    fixture.detectChanges();

    expect(apiServiceSpy.setStudent).toHaveBeenCalled();
    expect(apiServiceSpy.getUserDetails).toHaveBeenCalled();
    expect(apiServiceSpy.getAllProposals).toHaveBeenCalled();
    expect(apiServiceSpy.getProfessors).toHaveBeenCalled();
    expect(apiServiceSpy.getApplications).toHaveBeenCalled();
    expect(apiServiceSpy.checkAutorization).toHaveBeenCalled();

    tick();
  }));

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

  it('should update professorsSearchValue on calling updateProfessorsSearchValue', () => {
    expect(component.professorsSearchValue).toBe('');

    component.updateProfessorsSearchValue('prof1');

    expect(component.professorsSearchValue).toBe('prof1');
  });

  it('should call getAllProposals with the correct parameters when toggleProf is called', fakeAsync(() => {
    apiServiceSpy.getAllProposals.and.returnValue(Promise.resolve());

    const testProf = { name: 'Test', surname: 'Professor' };
    component.toggleProf(testProf);

    expect(apiServiceSpy.getAllProposals).toHaveBeenCalledWith({
      text: null,
      supervisors: [testProf],
      cosupervisors: null,
      expirationDate: null,
      abroad: null,
    });

    tick();
  }));

  it('should toggle the popup visibility', fakeAsync(() => {
    apiServiceSpy.setStudent.and.returnValue(Promise.resolve());
    apiServiceSpy.getUserDetails.and.returnValue(Promise.resolve());
    apiServiceSpy.getAllProposals.and.returnValue(Promise.resolve());
    apiServiceSpy.getProfessors.and.returnValue(Promise.resolve());
    apiServiceSpy.getApplications.and.returnValue(Promise.resolve());
    apiServiceSpy.getProposal.and.returnValue(Promise.resolve());
    apiServiceSpy.checkAutorization.and.returnValue();

    fixture.detectChanges(); 

    spyOn(component, 'togglePopup').and.callThrough();

    component.togglePopup();

    expect(component.popupVisible).toBe(true);

    component.togglePopup();

    expect(component.popupVisible).toBe(false);
    
    tick();
  }));

  it('should reset filters and fetch proposals when deleteFilters is called', fakeAsync(() => {
    apiServiceSpy.getAllProposals.and.returnValue(Promise.resolve());

    component.selectedProfs = [{ name: 'Professor 1' }, { name: 'Professor 2' }];
    component.searchValue = 'Search Term';

    component.deleteFilters();

    expect(component.selectedProfs).toEqual([]);
    expect(component.searchValue).toEqual('');

    expect(apiServiceSpy.getAllProposals).toHaveBeenCalledWith(null);

    tick();
  }));

  it('should call search method and make API calls', fakeAsync(() => {
    apiServiceSpy.getAllProposals.and.returnValue(Promise.resolve());

    component.searchValue = 'test';

    component.search();

    expect(apiServiceSpy.getAllProposals).toHaveBeenCalledWith(jasmine.objectContaining({
      text: 'test',
      supervisors: null,
      cosupervisors: null,
      expirationDate: null,
      abroad: null,
    }));

    tick();
  }));
});