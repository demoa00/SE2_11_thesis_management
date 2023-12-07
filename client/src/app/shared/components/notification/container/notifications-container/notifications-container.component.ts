import {Component, Injectable} from '@angular/core';
import {Socket} from "ngx-socket-io";

@Component({
  selector: 'app-notifications-container',
  templateUrl: './notifications-container.component.html',
  styleUrls: ['./notifications-container.component.scss']
})

@Injectable({
  providedIn: 'root'
})

export class NotificationsContainerComponent {
  constructor(private socket: Socket) {}

  notifications: any = []
  counter = 0;

  ngOnInit(){
    this.socket.on('message', (data: any) => {
      let n = {
        id: this.counter++,
        message: data,
      }
      this.notifications.push(n);
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
}
