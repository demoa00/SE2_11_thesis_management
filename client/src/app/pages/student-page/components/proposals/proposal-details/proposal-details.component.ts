import {Component, EventEmitter, Input, Output} from '@angular/core';
import {User} from "../../../../../shared/classes/user";
import {StudentDetails} from "../../../../../shared/classes/student/student-details";
import {APIService} from "../../../../../shared/services/api.service";
import * as dayjs from "dayjs"

@Component({
  selector: 'app-proposal-details',
  templateUrl: './proposal-details.component.html',
  styleUrl: './proposal-details.component.scss'
})
export class ProposalDetailsComponent {

  constructor(private api: APIService) {
  }

  user: User | undefined
  userDetails: StudentDetails | undefined
  applicationMessage: string = "";
  applicationFile: any;
  popupVisible = false
  showSuccessAlert = false;
  showErrorAlert = false;


  readonly dayjs = dayjs;

  @Input() selectedProposal: any | null = null;
  @Input() canApply: boolean = false;
  @Input() type=""
  @Input() professorStatus: string = "";
  @Input() secretaryStatus: string = "";
  @Output() selectedProposalUpdate = new EventEmitter<any>()
  @Output() secretaryShowPopup = new EventEmitter<string>();

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user') || '{}')
    if(this.user?.role==='student'){
      this.api.getStudentDetails(this.user?.userId).then((response: any) => {
        console.log(response)
        this.userDetails = response
      }).catch((error) => {
        console.log(error)
      })
      this.api.getApplications().then((response: any) => {
        this.canApply = !response.some((application: any) => {
          return application.status === "Accepted"
        })
      })
    }
  }

  apply() {
    let body = new FormData()
    if (this.applicationFile) {
      body.append('file', this.applicationFile)
    }
    if (this.applicationMessage) {
      body.append('message', this.applicationMessage)
    }
    body.append('thesisProposalId', this.selectedProposal?.thesisProposalId)

    this.api.insertNewApplication(body).then(() => {
      this.canApply = false
      this.togglePopup()
      this.applicationMessage = ""
      this.applicationFile = null
      this.showSuccessAlert = true
      setTimeout(() => {
        this.showSuccessAlert = false
      }, 5000)
    }).catch((error: any) => {
      this.showErrorAlert = true
      setTimeout(() => {
        this.showErrorAlert = false
      }, 5000)
      console.log(error)
    })
  }

  togglePopup() {
    this.popupVisible = !this.popupVisible
  }

  selectFile(file: any) {
    // console.log(file.target.files?.item(0))
    this.applicationFile = file.target.files?.item(0)
  }

  selectProposal(proposalId: number) {
    if (proposalId === -1) {
      this.selectedProposalUpdate.emit(null)
      return
    }
  }

  date(date: string) {
    return this.dayjs(date).format('DD/MM/YYYY')
  }

  showPopup(p: string) {
    this.secretaryShowPopup.emit(p)
  }

}
