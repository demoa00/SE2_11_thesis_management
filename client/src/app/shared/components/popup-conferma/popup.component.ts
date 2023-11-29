import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent implements OnInit {
  @Input()
  showCloseButton = true;
  @Input()
  title: string = '';
  @Input()
  closeClickOutside = true;
  @Input()
  response: any;
  @Input()
  showSlider?: boolean = true;
  @Input()
  showButton?: boolean = false;
  @Input()
  showLogo?: boolean = true;
  @Output()
  close = new EventEmitter();

  @Output()
  send = new EventEmitter<boolean>();

  @Output()
  requestAccepted = new EventEmitter<boolean>();

  showSliderAfterResponse = true;
  sending = false;
  constructor() {}

  ngOnInit() {
    this.showCloseButton = this.close.observed;
  }

  toggleButton() {
    this.showSliderAfterResponse = false;
  }

  @HostListener('window:keyup', ['$event'])
  onKeyUp(event: KeyboardEvent): void {
    if (event.key == 'Escape') this.close.emit();
  }
}
