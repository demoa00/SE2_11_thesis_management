import {Component, EventEmitter, Injectable, Output} from '@angular/core';
import {Socket} from "ngx-socket-io";
import {animate, style, transition, trigger} from "@angular/animations";
import { APIService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-notifications-container',
  templateUrl: './notifications-container.component.html',
  styleUrls: ['./notifications-container.component.scss'],
  animations: [
    trigger('slide', [
      transition(':enter', [
        style({height: '0'}),
        animate('400ms ease-in', style({
          height: '*'
        }))
      ]),
    ]),
    trigger('fade', [
      transition(':leave', [
        style({height: '*'}),
        animate('200ms ease-in', style({
          transform: 'translateX(100%)',
          opacity: 0
        }))
      ])
    ])
  ],
})

@Injectable({
  providedIn: 'root'
})

export class NotificationsContainerComponent {
  constructor(private socket: Socket, private api: APIService) {
  }

  notifications: any[] = []
  notificationsToShow: any[] = []
  showReadNotifications: boolean = false;

  counter = 0;
  @Output() applicationsPage = new EventEmitter<boolean>();
  @Output() counterChange = new EventEmitter<number>();
  @Output() close = new EventEmitter<boolean>();


  ngOnInit() {
    this.api.getNotifications().then((response: any) => {
      console.log(response);
      this.notifications = response;
      this.notificationsToShow = this.notifications.filter((n: any) => n.isRead === 0)
      this.counter = this.notificationsToShow.length;
      this.counterChange.emit(this.counter);
    })
    this.socket.on('message', (data: any) => {
      this.api.getNotifications().then((response: any) => {
        console.log(response);
        this.notifications = response;
        this.notificationsToShow = this.notifications.filter((n: any) => n.isRead === 0)
        this.counter = this.notificationsToShow.length;
        this.counterChange.emit(this.counter);
      })
    });
  }

  read(n: any) {
    this.api.updateNotification(n.notificationId).then((response: any) => {
    }).catch((error) => {
      console.log(error);
    })
    this.notifications.forEach((not: any) => {
      if (not.notificationId === n.notificationId) {
        not.isRead = 1;
      }
    })
    this.notificationsToShow = this.notificationsToShow.filter((not: any) => not.notificationId !== n.notificationId)
    this.counter = this.notificationsToShow.length;
    this.counterChange.emit(this.counter);

    console.log(n);
    switch (n.type) {
      case 2:
        this.applicationsPage.emit(true);
        break;
      case 5:
        this.applicationsPage.emit(true);
        break;
      default:
        break;
      //other cases here
    }
    this.close.emit(true);
  }

  delete(id: number) {
    this.api.updateNotification(id).then((response: any) => {
    }).catch((error) => {
      console.log(error);
    })
    this.notifications.forEach((not: any) => {
      if (not.notificationId === id) {
        not.isRead = 1;
      }
    })
    if(!this.showReadNotifications) {
      this.notificationsToShow = this.notificationsToShow.filter((n: any) => n.notificationId !== id)
    }
    this.counter = this.notificationsToShow.length;
    this.counterChange.emit(this.counter);
  }

  deleteAll() {
    this.notifications.forEach((not: any) => {
      this.api.updateNotification(not.notificationId).then((response: any) => {
      }).catch((error) => {
        console.log(error);
      })
      not.isRead = 1;
    })
    this.notificationsToShow = this.notifications.filter((n: any) => n.isRead === 0)
    this.counter = this.notificationsToShow.length;
    this.counterChange.emit(this.counter);
    this.close.emit(true);
  }

  toggleReadNotifications() {
    if(this.showReadNotifications) {
      this.notificationsToShow = this.notificationsToShow.filter((n: any) => n.isRead === 0)
    }
    else {
      this.notifications.forEach((not: any) => {
        if (not.isRead === 1) {
          this.notificationsToShow.push(not);
        }
      })
    }
    this.showReadNotifications = !this.showReadNotifications;
  }

}
