import {Component, EventEmitter, Input, Output} from '@angular/core';
import {APIService} from "../../../../shared/services/api.service";

@Component({
  selector: 'app-application-view',
  templateUrl: './application-view.component.html',
  styleUrls: ['./application-view.component.scss']
})
export class ApplicationViewComponent {
  constructor(private api: APIService) { }

  @Input() applications: any;
  selectedApplication: any;
  user = JSON.parse(localStorage.getItem('user') || '{}')

  ngOnInit(): void {
    this.api.getApplications().then((response: any) => {
      this.applications = response;
    })
  }

  selectApplication(application: any) {
    this.api.getApplicationById(application, this.user.userId).then((response: any) => {
      this.selectedApplication = response;
      console.log(this.selectedApplication)
    })
  }

  status = 'accepted'

}
