import {Component, Injectable} from '@angular/core';
import {Socket} from "ngx-socket-io";
import {animate, style, transition, trigger} from "@angular/animations";

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
        animate('300ms ease-in', style({
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
  constructor(private socket: Socket) {
  }

  notifications: any[] = []
  counter = 0;

  ngOnInit() {
    this.socket.on('message', (data: any) => {
      let n = {
        id: this.counter++,
        message: data,
      }
      this.notifications.unshift(n);
      console.log(this.notifications);
    });
  }

  read(id: number) {
    console.log(this.notifications[id]);
  }

  delete(id: number) {
    console.log(id);
    this.notifications = this.notifications.filter((n: any) => n.id !== id);
  }

  deleteAll() {
    this.notifications = [];
  }
}
