import {Component, EventEmitter, HostListener, Input, Output} from '@angular/core';
import {APIService} from "../../../../../shared/services/api.service";

@Component({
  selector: 'app-secretary-requests-view',
  templateUrl: './secretary-requests-view.component.html',
  styleUrl: './secretary-requests-view.component.scss'
})
export class SecretaryRequestsViewComponent {

  constructor(private api: APIService){}

  requests: any[] = []
  screenWidth = 0

  @Input() selectedRequest: any = null
  @Output() selectedRequestUpdate: any = new EventEmitter<any>()

  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.screenWidth = window.innerWidth;
  }

  ngOnInit() {
    this.api.getThesisRequests().then((response: any) => {
      console.log(response)
      this.requests = response
      if (response === undefined) {
        this.requests = []
      }
    }).catch((error) => {
      console.log(error)
      this.requests = []
    })
    this.screenWidth = window.innerWidth;
  }

  selectRequest(request: any) {
    this.api.getRequest(request.thesisRequestId).then((response: any) => {
      console.log(response)
      let selectedRequest = {
        ...response,
        coSupervisor: response.coSupervisors,
      }
      this.selectedRequestUpdate.emit(selectedRequest)
    }).catch((error) => {
      console.log(error)
    })
  }
}
