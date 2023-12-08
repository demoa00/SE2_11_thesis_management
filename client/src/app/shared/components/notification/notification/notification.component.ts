import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
})
export class NotificationComponent {
  @Input() notification: any
  @Output() delete = new EventEmitter<number>();

  deleteNotification(id: number) {
    this.delete.emit(id);
  }

}
