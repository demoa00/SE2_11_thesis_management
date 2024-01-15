import {Component, HostListener} from '@angular/core';
import {APIService} from "../../../../shared/services/api.service";

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrl: './requests.component.scss'
})
export class RequestsComponent {

  constructor(private api: APIService) {}

  requests: any[] = []
  showPopup = false
  screenWidth = 0
  showSuccessAlert = false
  showDangerAlert = false

  ngOnInit() {
    this.api.getThesisRequests().then((response: any) => {
      this.requests = response
    }).catch((error) => {
      console.log(error)
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
        this.showSuccessAlert = true
        setTimeout(() => {
          this.showSuccessAlert = false
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


  newRequests(requests: string) {
    console.log("NEW REQUESTS")
    console.log(requests)
  }
}
