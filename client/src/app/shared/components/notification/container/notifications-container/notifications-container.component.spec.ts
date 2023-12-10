import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationsContainerComponent } from './notifications-container.component';
import { Socket } from 'ngx-socket-io';
import { MatIconModule } from '@angular/material/icon';
import { Observable } from 'rxjs';

class mockSocket {
  on(event: String): Observable<any> {
    return new Observable();
  }
}

describe('NotificationsContainerComponent', () => {
  let component: NotificationsContainerComponent;
  let fixture: ComponentFixture<NotificationsContainerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MatIconModule],
      declarations: [NotificationsContainerComponent],
      providers: [{ provide: Socket, useClass: mockSocket }]
    });
    fixture = TestBed.createComponent(NotificationsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
