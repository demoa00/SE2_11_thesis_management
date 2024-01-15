import {Component, HostListener} from '@angular/core';
import {APIService} from "../../../../shared/services/api.service";

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrl: './requests.component.scss'
})
export class RequestsComponent {

  constructor(private api: APIService) {}

  requests: any[] = Array(0)
  screenWidth = 0
  requestToDelete: any = null;
  showInsertPopup = false
  showDeletePopup: boolean = false;
  showInsertSuccessAlert = false
  showDeleteSuccessAlert: boolean = false;
  showDangerAlert = false

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

  editRequest(request: any){}

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


}
