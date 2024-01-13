import { Component } from '@angular/core';
import {NgForOf} from "@angular/common";
import {AppModule} from "../../../../app.module";
import {APIService} from "../../../../shared/services/api.service";

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrl: './requests.component.scss'
})
export class RequestsComponent {

  constructor(private api: APIService) {}

  requests = []
  showPopup = false

  ngOnInit() {
    this.api.getThesisRequests().then((response: any) => {
      this.requests = response
    }).catch((error) => {
      console.log(error)
    })
  }
}
