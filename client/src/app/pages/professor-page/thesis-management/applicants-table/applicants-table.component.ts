import {Component, Input} from '@angular/core';
import {APIService} from "../../../../shared/services/api.service";

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

  constructor(private api: APIService) {
  }
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

  async rejectApplication(){
    this.response = await this.api.putApplication(this.applicant.studentId, this.applicant.thesisProposalId, 'Rejected')
    if (this.response){
      this.rows = await this.api.getApplications()
      this.requestAccepted = true;
    }
    this.applicant = undefined;
  }
  async acceptApplication(){
   this.response = await this.api.putApplication(this.applicant.studentId, this.applicant.thesisProposalId, 'Accepted')
    if (this.response){
      this.rows = await this.api.getApplications()
      this.requestAccepted = true;
    }
    this.applicant = undefined;
  }

}
