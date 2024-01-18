import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { PageSkeletonComponent } from './page-skeleton.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ButtonComponent } from '../button/button.component';
import { RouterTestingModule } from '@angular/router/testing';
import { MatIconModule } from '@angular/material/icon';
import { APIService } from '../../services/api.service';
import { MatDatepickerInputEvent, MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

describe('PageSkeletonComponent', () => {
  let component: PageSkeletonComponent;
  let fixture: ComponentFixture<PageSkeletonComponent>;
  let apiService: jasmine.SpyObj<APIService>;

  beforeEach(async () => {
    apiService = jasmine.createSpyObj('APIService', {
      'logout': null,
      'checkAutorization': Promise.resolve([]),
      'getUserDetails': Promise.resolve({}),
      'getProfessorDetails': Promise.resolve([]),
      'putVirtualClock': Promise.resolve([]),
      'getAllProposals': Promise.resolve([]),
      'getApplications': Promise.resolve([]),
      'getSecretaryClerkDetails': Promise.resolve([]),
    });

    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule, MatIconModule, MatDatepickerModule, MatNativeDateModule],
      declarations: [PageSkeletonComponent, ButtonComponent],
      providers: [{ provide: APIService, useValue: apiService }]
    }).compileComponents();

    fixture = TestBed.createComponent(PageSkeletonComponent);
    component = fixture.componentInstance;

    await fixture.whenStable();

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call APIService.logout() when logout() is called', () => {
    const user = { userId: 'testUserId', role: 'student' };
    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(user));
    spyOn(localStorage, 'removeItem');

    component.logout();

    expect(apiService.logout).toHaveBeenCalledWith(user.userId);
    expect(localStorage.removeItem).toHaveBeenCalledWith('user');
  });

  it('should call getUserDetails when user role is student', async () => {
    const user = { userId: 'testUserId', role: 'student' };
    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(user));

    component.ngOnInit();

    expect(apiService.getStudentDetails).toHaveBeenCalledWith(user.userId);
  });

  it('should call getProfessorDetails when user role is professor', async () => {
    const user = { userId: 'testUserId', role: 'professor' };
    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(user));

    component.ngOnInit();

    expect(apiService.getProfessorDetails).toHaveBeenCalledWith(user.userId);
  });

  it('should set menuOpen to true when openMenu() is called', () => {
    component.menuOpen = false;

    component.openMenu();

    expect(component.openMenu).toBeTruthy();
  });

  it('should call goToProfile() and emit true to profilePage', () => {
    const profilePageSpy = spyOn(component.profilePage, 'emit');

    component.goToProfile();

    expect(profilePageSpy).toHaveBeenCalledWith(true);
  });

  it('should open notifications and emit event', fakeAsync(() => {
    spyOn(component.notificationsOpenChange, 'emit');

    component.openNotifications();

    tick();

    expect(component.notificationsOpen).toBe(true);
    expect(component.notificationsOpenChange.emit).toHaveBeenCalledWith(true);
  }));

  it('should close notifications', () => {
    component.notificationsOpen = true;
    const emitSpy = spyOn(component.notificationsOpenChange, 'emit');

    component.closeNotifications();

    expect(component.notificationsOpen).toBe(false);
    expect(emitSpy).toHaveBeenCalledWith(false);
  });

  it('should call the necessary methods and emit events when selectDate() is called', fakeAsync(() => {
    const datepickerEvent: MatDatepickerInputEvent<any, any> = {
      value: new Date('2024-01-11'),
      target: {} as any,
      targetElement: {} as any
    };

    apiService.putVirtualClock.and.returnValue(Promise.resolve([]));
    apiService.getAllProposals.and.returnValue(Promise.resolve([]));
    apiService.getApplications.and.returnValue(Promise.resolve([]));

    const newProposalsSpy = spyOn(component.newProposals, 'emit');
    const newApplicationsSpy = spyOn(component.newApplications, 'emit');

    component.selectDate(datepickerEvent);

    tick();

    expect(apiService.putVirtualClock).toHaveBeenCalledOnceWith('2024-01-11');
    expect(apiService.getAllProposals).toHaveBeenCalledTimes(1);
    expect(apiService.getApplications).toHaveBeenCalledTimes(1);

    expect(newProposalsSpy).toHaveBeenCalledWith([]);
    expect(newApplicationsSpy).toHaveBeenCalledWith([]);
  }));
});
