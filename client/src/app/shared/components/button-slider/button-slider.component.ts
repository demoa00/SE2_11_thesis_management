import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CdkDragEnd, CdkDragMove } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-button-slider',
  templateUrl: './button-slider.component.html',
  styleUrls: ['./button-slider.component.scss']
})
export class ButtonSliderComponent {
  @Output()
  buttonSliderSubmit = new EventEmitter<boolean>();
  @Output()
  requestAccepted = new EventEmitter<boolean>();
  @Input()
  responseFromServer: {} = {};

  messageSendable: boolean = false;
  messageEmitted = false;
  responseReceived = false;
  responseNotReceived = false;

  checkDragEnd($event: CdkDragEnd) {
    let timeout: any;
    if (this.messageSendable) {
      this.buttonSliderSubmit.emit(true);
      this.messageEmitted = true;
      let timer = setInterval(() => {
        console.log('RISPOSTA BOTTONE', this.responseFromServer);
        if (this.responseFromServer) {
          this.messageEmitted = false;
          this.responseReceived = true;
          clearInterval(timer);
          clearTimeout(timeout);
          setTimeout(() => {
            this.responseReceived = false;
            this.responseFromServer = {};
            this.requestAccepted.emit(true);
          }, 2000);
        }
      }, 100);
      timeout = setTimeout(() => {
        clearInterval(timer);
        this.messageEmitted = false;
        this.responseNotReceived = true;
        setTimeout(() => (this.responseNotReceived = false), 2000);
      }, 35000);
    }
    $event.source.setFreeDragPosition({ x: 0, y: 0 });
    this.messageSendable = false;
  }

  takePosition($event: CdkDragMove) {
    if ($event.source.getFreeDragPosition().x >= 113) {
      this.messageSendable = true;
    }
    if ($event.source.getFreeDragPosition().x < 113) {
      this.messageSendable = false;
    }
  }
}
