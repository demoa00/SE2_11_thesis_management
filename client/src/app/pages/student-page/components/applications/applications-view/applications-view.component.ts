import {Component, EventEmitter, HostListener, Input, Output} from '@angular/core';
import {APIService} from "../../../../../shared/services/api.service";

@Component({
  selector: 'app-applications-view',
  templateUrl: './applications-view.component.html',
  styleUrls: ['./applications-view.component.scss']
})
export class ApplicationsViewComponent {
  constructor(private api: APIService) {
  }

  @Input() applications: any;
  selectedApplication = {
    title: "",
    description: "",
    professorId: ""
  };
  user = JSON.parse(localStorage.getItem('user') || '{}')
  screenWidth = 0
  showPopup = false
  showInsertSuccessAlert = false
  showDangerAlert = false
  @Output() selectedApplicationDetails = new EventEmitter<any>()

  ngOnInit(): void {
    this.api.getApplications().then((response: any) => {
      this.applications = response;
    })
    this.screenWidth = window.innerWidth;
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.screenWidth = window.innerWidth;
  }

  status = 'accepted'

  newRequest(a: any) {
    this.showPopup = true
    this.api.getArchivedProposal(a.thesisProposalId).then((res: any) => {
      console.log(res)
      this.selectedApplication = {
        title: res.title,
        description: res.description,
        professorId: res.supervisor.professorId
      }
    })
  }

  showAlert($event: string) {
    if ($event === 'success') {
      this.showInsertSuccessAlert = true
      setTimeout(() => {
        this.showInsertSuccessAlert = false
      }, 5000)
    } else if ($event === 'danger') {
      this.showDangerAlert = true
      setTimeout(() => {
        this.showDangerAlert = false
      }, 5000)
    }
  }

  selectApplication(a: any) {
    console.log(a)
    let thesisProposalId = a.thesisProposalId
    this.api.getProposal(thesisProposalId).then((res: any) => {
      console.log(res)
      this.selectedApplicationDetails.emit(res)
    }).catch((err: any) => {
      console.log(err)
      this.showDangerAlert = true
      setTimeout(() => {
        this.showDangerAlert = false
      }, 5000)
    })
  }
}
