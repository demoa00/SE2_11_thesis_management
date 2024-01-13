// @ts-ignore

import {Component, EventEmitter} from '@angular/core';
import {APIService} from "../../shared/services/api.service";
import {User} from "../../shared/classes/user";
import {StudentDetails} from "../../shared/classes/student/student-details";
import * as dayjs from "dayjs"

type ProposalsParams = {
  text: string | null;
  supervisors: {}[] | null;
  cosupervisors: {}[] | null;
  extCs: {}[] | null;
  expirationDate: string | null;
  abroad: boolean | null;
}

type Proposal = {
  expirationDate: string;
  keywords: string;
  name: string;
  self: string;
  surname: string;
  thesisProposalId: number;
  title: string;
}

@Component({
  selector: 'app-student-page',
  templateUrl: './student-page.component.html',
  styleUrls: ['./student-page.component.css']
})


export class StudentPageComponent {
  notificationsOpen: boolean = false;

  constructor(public api: APIService) {
    this.api.setStudent()
  }

  /*protected*/
  readonly dayjs = dayjs;

  user: User | undefined
  userDetails: StudentDetails | undefined
  proposals: Proposal[] = []
  selectedProposal: any | null = null;
  searchValue: string = "";
  professorsHover = false
  professors: any;
  professorsSearchValue = "";
  selectedProfs: any[] = []
  popupVisible = false
  applications: any
  canApply = true
  showSuccessAlert = false;
  showErrorAlert = false;
  showFilters = false;
  proposalParams: ProposalsParams = {
    text: null,
    supervisors: null,
    cosupervisors: null,
    extCs: null,
    expirationDate: null,
    abroad: null
  }
  menuItems = [
    {
      'id': 0,
      'selected': true,
      'hovered': false,
      'text': 'Proposals'
    },
    {
      'id': 1,
      'selected': false,
      'hovered': false,
      'text': 'Applications'
    },
    {
      'id': 2,
      'selected': false,
      'hovered': false,
      'text': 'Requests'
    }
  ]
  applicationMessage: string = "";
  applicationFile: any;

  trigger: boolean = false
  profilePage: boolean = false;

  closeMenu() {
    this.trigger = !this.trigger
  }

  unreadCounter = 0
  newApplications: File | null = null;

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user') || '{}')
    this.api.getUserDetails(this.user?.userId).then((response: any) => {
      this.userDetails = response
    })
    this.api.getAllProposals(null).then((response: any) => {
      this.proposals = response
    })
    this.api.getSupervisors().then((response: any) => {
      this.professors = response
    })
    this.api.getApplications().then((response: any) => {
      this.applications = response
    }).catch((error: any) => {
      console.log(error)
    })
  }

  selectMenuItem(id: number) {
    this.menuItems.forEach((item) => {
      item.selected = false
    })
    this.menuItems[id].selected = true
  }

  updateSearchValue(value: string) {
    this.searchValue = value.trim().toLowerCase();
  }

  toggleProf(prof: any) {
    if (this.selectedProfs.includes(prof)) {
      this.selectedProfs = this.selectedProfs.filter(item => item !== prof)
    } else {
      this.selectedProfs.push(prof)
    }
    this.selectedProfs.length === 0 ? this.proposalParams.supervisors = null : this.proposalParams.supervisors = this.selectedProfs
    this.checkFilters()
    this.api.getAllProposals(this.proposalParams).then((response: any) => {
      this.proposals = response
    }).catch((error: any) => {
      console.log(error)
    })
  }

  isProfSelected(prof: any) {
    return this.selectedProfs.includes(prof)
  }

  selectProposal(proposalId: number) {
    if (proposalId === -1) {
      this.selectedProposal = null
      return
    }
    this.api.getProposal(proposalId).then((response: any) => {
      this.selectedProposal = response
    })
    this.canApply = true
    if (this.applications !== undefined) {
      this.applications.forEach((application: any) => {
        if (application.thesisProposalId === proposalId) {
          this.canApply = false
        }
      })
    }
  }

  search() {
    this.proposalParams.text = this.searchValue
    if (this.searchValue === "") {
      this.proposalParams.text = null
    }
    this.api.getAllProposals(this.proposalParams).then((response: any) => {
      this.proposals = response
    }).catch((error) => {
      console.log(JSON.stringify(error))
      if (!!error) {
        this.proposals = []
      }
    })
    this.checkFilters()
  }

  checkFilters() {
    return this.proposalParams.text !== null
      || this.proposalParams.supervisors !== null
      || this.proposalParams.cosupervisors !== null
      || this.proposalParams.expirationDate !== null
      || this.proposalParams.abroad !== null;
  }

  deleteFilters() {
    this.proposalParams = {
      text: null,
      supervisors: null,
      cosupervisors: null,
      extCs: null,
      expirationDate: null,
      abroad: null
    }
    this.selectedProfs = []
    this.searchValue = ""
    this.api.getAllProposals(null).then((response: any) => {
      this.proposals = response
    }).catch((error: any) => {
      console.log(error)
    })
    new EventEmitter<any>().emit(this.proposals)
  }

  date(date: string) {
    return this.dayjs(date).format('DD/MM/YYYY')
  }

  togglePopup() {
    this.popupVisible = !this.popupVisible
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
      }, 3000)
    }).catch((error: any) => {
      this.showErrorAlert = true
      setTimeout(() => {
        this.showErrorAlert = false
      }, 3000)
      console.log(error)
    })
  }

  toggleMoreFilters() {
    if (!this.showFilters) {
      this.showFilters = true
    } else {
      this.showFilters = false
      this.proposalParams.cosupervisors = null
      this.proposalParams.extCs = null
      this.proposalParams.expirationDate = null
      this.api.getAllProposals(this.proposalParams).then((response: any) => {
        this.proposals = response
      }).catch((error: any) => {
        console.log(error)
      })
    }
  }

  goToApplicationPage(e: boolean) {
    if (e) {
      this.selectMenuItem(1)
      this.profilePage = false

    }
  }

  goToProfilePage($event: boolean) {
    if ($event) {
      this.menuItems.forEach((item) => {
        item.selected = false
      })
      this.profilePage = true
    }
  }

  closeNotifications($event: boolean) {
    console.log($event)
    this.notificationsOpen = false
  }

  selectFile(file: any) {
    // console.log(file.target.files?.item(0))
    this.applicationFile = file.target.files?.item(0)
  }
}

