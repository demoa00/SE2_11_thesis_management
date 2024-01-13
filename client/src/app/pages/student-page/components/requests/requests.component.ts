import { Component } from '@angular/core';
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

  ngOnInit() {
    this.api.getThesisRequests().then((response: any) => {
      this.requests = response
    }).catch((error) => {
      console.log(error)
    })
  }
}
