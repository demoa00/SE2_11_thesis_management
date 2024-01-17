import {Component, EventEmitter, HostListener, Output} from '@angular/core';
import {APIService} from "../../../../../shared/services/api.service";

@Component({
  selector: 'app-requests',
  templateUrl: './requests-view.component.html',
  styleUrl: './requests-view.component.scss'
})
export class RequestsViewComponent {

  constructor(private api: APIService) {}

  requests: any[] = Array(0)
  screenWidth = 0
  requestToDelete: any = null;
  requestToEdit: any = null;
  showInsertPopup = false
  showDeletePopup: boolean = false;
  showEditPopup: boolean = false;
  showInsertSuccessAlert = false
  showDeleteSuccessAlert: boolean = false;
  showEditSuccessAlert: boolean = false;
  showDangerAlert = false

  @Output() selectedRequest = new EventEmitter<any>()
  ngOnInit() {
    this.requests = Array(0)
    this.api.getThesisRequests().then((response: any) => {
      this.requests = response
    }).catch((error) => {
      console.log(error)
      this.requests = []
    })
    this.screenWidth = window.innerWidth;
  }


  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.screenWidth = window.innerWidth;
  }

  showAlert(type: string){
    console.log("SHOW ALERT")
    console.log(type)
    if(type === 'success') {
      this.api.getThesisRequests().then((response: any) => {
        console.log(this.requests)
        this.requests = response
        this.showInsertSuccessAlert = true
        setTimeout(() => {
          this.showInsertSuccessAlert = false
        }, 5000)
      }).catch((error) => {
        console.log(error)
      })
    }
    else if(type === 'danger') {
      this.showDangerAlert = true
      setTimeout(() => {
        this.showDangerAlert = false
      }, 5000)
    }
  }

  editRequest(request: any){
    this.api.getRequest(request.thesisRequestId).then(response=>{
      console.log(response)
      this.requestToEdit = response
      this.showEditPopup = true
    }).catch(error=>{
      console.log(error)
      this.showDangerAlert = true
      setTimeout(()=>{
        this.showDangerAlert = false
      }, 5000)
    })
  }

  selectRequestToDelete(request: any){
    this.requestToDelete = request;
    this.showDeletePopup = true;
  }
  deleteRequest(){
    console.log(this.requestToDelete)
    this.api.deleteThesisRequest(this.requestToDelete.thesisRequestId).then((response: any) => {
      console.log(response)
      this.api.getThesisRequests().then((response: any) => {
        this.requests = response
        this.showDeleteSuccessAlert = true
        setTimeout(()=>{
          this.showDeleteSuccessAlert = false
        }, 5000)
      }).catch((error) => {
        console.log(error)
        this.showDangerAlert = true
        setTimeout(()=>{
          this.showDangerAlert = false
        }, 5000)
        this.requests = []
      })
    }).catch((error) => {
      console.log(error)
      this.showDangerAlert = true
      setTimeout(()=>{
        this.showDangerAlert = false
      }, 5000)
    })
    this.showDeletePopup = false
  }

  selectRequest(request: any) {
    this.api.getRequest(request.thesisRequestId).then((response: any) => {
      console.log(response)
      let selectedRequest = {
        proposal:{
          title: response.title,
          description: response.description,
          supervisor: response.supervisor,
          coSupervisor: response.coSupervisors,
        },
        message: response.message,
        date: response.date,
        approvalDate: response.approvalDate,
        professorStatus: response.professorStatus,
        secretaryStatus: response.secretaryStatus,
      }
      this.selectedRequest.emit(selectedRequest)
    }).catch((error) => {
      console.log(error)
    })
  }

}
