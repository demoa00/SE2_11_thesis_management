import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { NotificationsContainerComponent } from './notifications-container.component';
import { Socket } from 'ngx-socket-io';
import { MatIconModule } from '@angular/material/icon';
import { Observable } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NotificationComponent } from '../../notification/notification.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

class mockSocket {
  on(event: String): Observable<any> {
    return new Observable();
  }
}

describe('NotificationsContainerComponent', () => {
  let component: NotificationsContainerComponent;
  let fixture: ComponentFixture<NotificationsContainerComponent>;
  let socketSpy: jasmine.SpyObj<Socket>;

  beforeEach(() => {
    socketSpy = jasmine.createSpyObj('Socket', ['on']);

    TestBed.configureTestingModule({
      imports: [MatIconModule, HttpClientTestingModule, BrowserAnimationsModule],
      declarations: [NotificationsContainerComponent, NotificationComponent],
      providers: [{ provide: Socket, useClass: mockSocket }]
    });

    fixture = TestBed.createComponent(NotificationsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('should add a notification when receiving a message', fakeAsync(() => {
  //   const data = 'Test Message';
  //   socketSpy.on.and.callFake((event: string, callback: (data: any) => void) => {
  //     callback(data);
  //   });

  //   fixture.detectChanges();
  //   tick();

  //   expect(component.notifications.length).toBe(1);
  //   expect(component.notifications[0].message).toBe(data);
  // }));
});
