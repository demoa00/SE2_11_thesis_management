import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { NotificationsContainerComponent } from './notifications-container.component';
import { Socket } from 'ngx-socket-io';
import { MatIconModule } from '@angular/material/icon';
import { Observable } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NotificationComponent } from '../../notification/notification.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { APIService } from 'src/app/shared/services/api.service';

class mockSocket {
  on(): Observable<any> {
    return new Observable();
  }
}

describe('NotificationsContainerComponent', () => {
  let component: NotificationsContainerComponent;
  let fixture: ComponentFixture<NotificationsContainerComponent>;
  let socketSpy: jasmine.SpyObj<Socket>;
  let apiService: jasmine.SpyObj<APIService>;

  beforeEach(async () => {
    apiService = jasmine.createSpyObj('APIService', {
      'getNotifications': Promise.resolve([]),
      'updateNotification': Promise.resolve([])
    });

    socketSpy = jasmine.createSpyObj('Socket', ['on']);

    await TestBed.configureTestingModule({
      imports: [MatIconModule, HttpClientTestingModule, BrowserAnimationsModule],
      declarations: [NotificationsContainerComponent, NotificationComponent],
      providers: [
        { provide: APIService, useValue: apiService },
        { provide: Socket, useClass: mockSocket }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(NotificationsContainerComponent);
    component = fixture.componentInstance;

    await fixture.whenStable();

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize notifications on ngOnInit', fakeAsync(() => {
    const mockNotifications = [{}];
    apiService.getNotifications.and.returnValue(Promise.resolve(mockNotifications));

    component.ngOnInit();
    tick();

    expect(apiService.getNotifications).toHaveBeenCalled();
    expect(component.notifications).toEqual(mockNotifications);
  }));

  it('should mark notification as read and emit events', fakeAsync(() => {
    const notification = { notificationId: 1, type: 2, isRead: 0 };
  
    component.notifications = [notification];
    component.notificationsToShow = [notification];
  
    spyOn(component.applicationsPage, 'emit');
    spyOn(component.counterChange, 'emit');
    spyOn(component.close, 'emit');
  
    fixture.detectChanges();
  
    component.read(notification);
  
    expect(apiService.updateNotification).toHaveBeenCalledWith(notification.notificationId);
    expect(component.notificationsToShow.length).toBe(0); // Since the notification is marked as read
    expect(component.counterChange.emit).toHaveBeenCalledWith(0);
    expect(component.applicationsPage.emit).toHaveBeenCalledWith(true);
    expect(component.close.emit).toHaveBeenCalledWith(true);
  }));

  it('should delete a notification', async() => {
    const notificationIdToDelete = 123;
    const initialNotifications = [
      { notificationId: 123, isRead: 0 },
      { notificationId: 456, isRead: 0 },
    ];
  
    component.notifications = initialNotifications;
    component.notificationsToShow = initialNotifications;
    component.counter = initialNotifications.length;
  
    component.delete(notificationIdToDelete);
    await fixture.whenStable().then(() => {
      fixture.detectChanges();
    });
    
    expect(apiService.updateNotification).toHaveBeenCalledWith(notificationIdToDelete);
    expect(component.notifications).toEqual(initialNotifications);
    expect(component.notificationsToShow).toEqual([{ notificationId: 456, isRead: 0 }]);
    expect(component.counter).toBe(1);
  });

  it('should delete all notifications', async () => {
    const initialNotifications = [
      { notificationId: 1, isRead: 0 },
      { notificationId: 2, isRead: 0 },
    ];
  
    apiService.getNotifications.and.returnValue(Promise.resolve(initialNotifications));
  
    component.ngOnInit();
    await fixture.whenStable();
  
    expect(component.notifications.length).toBe(initialNotifications.length);

    spyOn(component.counterChange, 'emit');
    spyOn(component.close, 'emit');
  
    component.deleteAll();
    await fixture.whenStable();
  
    expect(component.notifications.length).toBe(2);
    expect(component.notificationsToShow.length).toBe(0);
    expect(component.counter).toBe(0);
    expect(component.counterChange.emit).toHaveBeenCalledWith(0);
    expect(component.close.emit).toHaveBeenCalledWith(true);
  
    initialNotifications.forEach((notification) => {
      expect(apiService.updateNotification).toHaveBeenCalledWith(notification.notificationId);
    });
  });
  
  it('should toggle read notifications', () => {
    component.toggleReadNotifications();
  
    expect(component.showReadNotifications).toBe(true);
  
    component.toggleReadNotifications();
  
    expect(component.showReadNotifications).toBe(false);
  });
  
  it('should filter read notifications', () => {
    component.showReadNotifications = true;
    const readNotification = { notificationId: 1, isRead: 1 };
    const unreadNotification = { notificationId: 2, isRead: 0 };
    component.notificationsToShow = [readNotification, unreadNotification];
  
    component.toggleReadNotifications();
  
    expect(component.notificationsToShow).toEqual([unreadNotification]);
  });

  it('should update notificationsToShow', () => {
    component.showReadNotifications = false;
    const readNotification = { notificationId: 1, isRead: 1 };
    const unreadNotification = { notificationId: 2, isRead: 0 };
    component.notifications = [readNotification, unreadNotification];
  
    component.toggleReadNotifications();
  
    expect(component.notificationsToShow).toEqual([readNotification]);
  });
});
