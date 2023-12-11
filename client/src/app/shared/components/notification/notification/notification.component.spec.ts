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
});
