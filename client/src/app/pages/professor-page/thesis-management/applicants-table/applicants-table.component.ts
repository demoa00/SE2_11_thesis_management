import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-applicants-table',
  templateUrl: './applicants-table.component.html',
  styleUrls: ['./applicants-table.component.scss']
})
export class ApplicantsTableComponent {

  @Input()
  rows:any;


  response :any;
  requestAccepted: boolean = false;
  rejectPopup= false;
  acceptPopup= false;
  applicant:any;

  openAcceptPopup() {
    this.acceptPopup = !this.acceptPopup;
    this.requestAccepted = false;
    this.response = undefined;
  }
  openRejectPopup() {
    this.rejectPopup = !this.rejectPopup;
    this.requestAccepted = false;
    this.response = undefined;
  }

  rejectApplication(){
    this.applicant = undefined;
  }
  acceptApplication(){
    this.applicant = undefined;
  }

}
