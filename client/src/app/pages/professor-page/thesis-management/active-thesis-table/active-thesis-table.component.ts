import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-active-thesis-table',
  templateUrl: './active-thesis-table.component.html',
  styleUrls: ['./active-thesis-table.component.scss']
})
export class ActiveThesisTableComponent {

  @Input()
  rows:any;

  createPopup: boolean = false;
  response :any;
  requestAccepted: boolean = false;

  openCreatePopup() {
    this.createPopup = !this.createPopup;
    this.requestAccepted = false;
    this.response = undefined;
  }
}
