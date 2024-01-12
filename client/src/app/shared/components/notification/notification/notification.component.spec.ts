import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NotificationComponent } from './notification.component';
import { MatIconModule } from '@angular/material/icon';

describe('NotificationComponent', () => {
  let component: NotificationComponent;
  let fixture: ComponentFixture<NotificationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MatIconModule],
      declarations: [NotificationComponent]
    });

    const notification = { message: 'Test message' };

    fixture = TestBed.createComponent(NotificationComponent);
    component = fixture.componentInstance;

    component.notification = notification;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit delete event with correct id when deleteNotification is called', () => {
    const notification = { id: 1, message: 'Test message' };
    component.notification = notification;
    const deleteSpy = spyOn(component.delete, 'emit');

    component.deleteNotification(notification.id);

    expect(deleteSpy).toHaveBeenCalledWith(notification.id);
  });
});
