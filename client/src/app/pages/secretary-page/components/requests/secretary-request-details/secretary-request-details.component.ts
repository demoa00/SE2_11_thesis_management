import {Component, EventEmitter, Input, Output, signal} from '@angular/core';
import {APIService} from "../../../../../shared/services/api.service";

@Component({
  selector: 'app-secretary-request-details',
  templateUrl: './secretary-request-details.component.html',
  styleUrl: './secretary-request-details.component.scss'
})
export class SecretaryRequestDetailsComponent {

  constructor(private api: APIService) {
  }

  @Input() selectedRequest: any;
  @Output() selectedRequestUpdate = new EventEmitter<unknown>();

  showAcceptPopup = false
  showRejectPopup = false
  showApproveSuccessAlert = false;
  showRejectSuccessAlert = false;
  showDangerAlert = false;

  showPopup(p: string) {
    console.log(p)
    if(p==='approve') {
      this.showAcceptPopup = true
    }
    if(p==='reject') {
      this.showRejectPopup = true
    }
  }

  approveRequest(){
    const body = {
      thesisRequestId: this.selectedRequest.thesisRequestId,
      thesisProposalId: this.selectedRequest.thesisProposalId,
      requester: {studentId: this.selectedRequest.requester.studentId},
      title: this.selectedRequest.title,
      description: this.selectedRequest.description,
      supervisor: {professorId: this.selectedRequest.supervisor.professorId},
      secretaryStatus: 'Accepted',
    }
    this.api.putThesisRequestSecretary(body).then((res: any) => {
      console.log(res)
      this.showApproveSuccessAlert = true;
      this.showAcceptPopup = false
      setTimeout(()=>{
        this.showApproveSuccessAlert = false
      }, 5000)
    }).catch((err: any) => {
      this.showDangerAlert = true;
      this.showAcceptPopup = false
      console.log(err)
    })
  }
  rejectRequest(){
    const body = {
      thesisRequestId: this.selectedRequest.thesisRequestId,
      thesisProposalId: this.selectedRequest.thesisProposalId,
      requester: {studentId: this.selectedRequest.requester.studentId},
      title: this.selectedRequest.title,
      description: this.selectedRequest.description,
      supervisor: {professorId: this.selectedRequest.supervisor.professorId},
      secretaryStatus: 'Rejected',
    }
    this.api.putThesisRequestSecretary(body).then((res: any) => {
      console.log(res)
      this.showRejectSuccessAlert = true;
      this.showRejectPopup = false
      setTimeout(()=>{
        this.showRejectSuccessAlert = false
      }, 5000)
    }).catch((err: any) => {
      this.showDangerAlert = true;
      this.showRejectPopup = false
      setTimeout(()=>{
        this.showDangerAlert = false
      }, 5000)
      console.log(err)
    })
  }
}
