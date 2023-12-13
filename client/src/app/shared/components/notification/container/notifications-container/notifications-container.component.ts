import {Component, EventEmitter, Injectable, Output} from '@angular/core';
import {Socket} from "ngx-socket-io";
import {animate, style, transition, trigger} from "@angular/animations";
import {APIService} from "../../../../services/api.service";

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
  counter = 0;
  @Output() applicationsPage = new EventEmitter<boolean>();

  ngOnInit() {
    this.api.getNotifications().then((response: any) => {
      console.log(response);
      this.notifications = response;
    })
    this.socket.on('message', (data: any) => {
      // let n = {
      //   id: this.counter++,
      //   message: data,
      // }
      // this.notifications.unshift(n);
      // console.log(this.notifications);
      this.api.getNotifications().then((response: any) => {
        console.log(response);
        this.notifications = response;
        this.notificationsToShow = this.notifications.filter((n: any) => n.isRead === 0)
      })
    });
  }

  read(n: any) {

    this.api.updateNotification(n.notificationId).then((response: any) => {
    }).catch((error) => {
      console.log(error);
    })
    this.notifications = this.notifications.filter((not: any) => not.notificationId !== n.notificationId);

    console.log(n);
    switch (n.type) {
      case 2:
        this.applicationsPage.emit(true);
        break;
      //other cases here
    }
  }

  delete(id: number) {
    console.log(id);
    this.notifications = this.notifications.filter((n: any) => n.id !== id);
  }

  deleteAll() {
    this.notifications = [];
  }
}
