import {Component, EventEmitter, Input, Output} from '@angular/core';
import {APIService} from "../../../../shared/services/api.service";

@Component({
  selector: 'app-thesis-requests-table',
  templateUrl: './thesis-requests-table.component.html',
  styleUrl: './thesis-requests-table.component.scss'
})
export class ThesisRequestsTableComponent {
  @Input()
  rows:any;
  @Output()
  triggerUpdate: EventEmitter<void> = new EventEmitter<void>();

  // deletePopup: boolean = false;
  response :any;
  requestAccepted: boolean = false;
  selectedRequest: any;
  actionRequest : any;
  updatePopup: boolean = false;
  rejectPopup: boolean = false;
  acceptPopup: boolean = false;
  textMessage: any;




  constructor(private api:APIService) {
  }

  shohDetails(row: any) {
    this.api.getRequest(row.thesisRequestId).then((response: any) => {
      console.log(response)
      this.selectedRequest = response
    })
  }

  openAcceptPopup(actionRequest?:any) {
    if (actionRequest){
      this.actionRequest = actionRequest
    }
    this.acceptPopup = !this.acceptPopup;
    this.requestAccepted = false;
    this.response = undefined;
  }
  openRejectPopup(actionRequest?:any) {
    if (actionRequest){
      this.actionRequest = actionRequest
    }
    this.rejectPopup = !this.rejectPopup;
    this.requestAccepted = false;
    this.response = undefined;
  }

  openUpdatePopup(actionRequest?:any) {
    if (actionRequest){
      this.actionRequest = actionRequest
    }
    this.updatePopup = !this.updatePopup;
    this.requestAccepted = false;
    this.response = undefined;
  }


  async rejectThesisRequest(){
    console.log(this.actionRequest)
    const professor = JSON.parse(localStorage.getItem('professor')!)
    this.response = await this.api.putThesisRequest(this.actionRequest.supervisor? this.actionRequest.supervisor.professorId: professor.professorId, this.actionRequest.thesisRequestId, 'Rejected')
    if (this.response){
      this.rows = await this.api.getThesisRequests()
      this.requestAccepted = true;
    }
    this.actionRequest = undefined;
  }
  async acceptThesisRequest(){
    const professor = JSON.parse(localStorage.getItem('professor')!)
    this.response = await this.api.putThesisRequest(this.actionRequest.supervisor? this.actionRequest.supervisor.professorId: professor.professorId, this.actionRequest.thesisRequestId, 'Accepted')
    if (this.response){
      this.rows = await this.api.getThesisRequests()
      this.requestAccepted = true;
    }
    this.actionRequest = undefined;
  }

  async updateThesisRequest(text:any){
    const professor = JSON.parse(localStorage.getItem('professor')!)
    this.response = await this.api.putThesisRequest(this.actionRequest.supervisor? this.actionRequest.supervisor.professorId: professor.professorId, this.actionRequest.thesisRequestId, 'Change', text)
    if (this.response){
      this.rows = await this.api.getThesisRequests()
      this.requestAccepted = true;
    }
    this.actionRequest = undefined;
  }

}
