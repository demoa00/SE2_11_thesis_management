// @ts-ignore

import {Component} from '@angular/core';
import {APIService} from "../../shared/services/api.service";
import {User} from "../../shared/classes/student/user";
import {StudentDetails} from "../../shared/classes/student/student-details";

type ProposalsParams = {
  text: string | null;
  supervisors: {}[] | null;
  cosupervisors: {}[] | null;
  expirationDate: string | null;
  abroad: boolean | null;
}

type Proposal = {
  expirationDate: string | undefined;
  keywords: string | undefined;
  name: string | undefined;
  self: string | undefined;
  surname: string | undefined;
  thesisProposalId: string | undefined;
  title: string | undefined;
}

@Component({
  selector: 'app-student-page',
  templateUrl: './student-page.component.html',
  styleUrls: ['./student-page.component.css']
})

export class StudentPageComponent {

  constructor(public api: APIService) {
    this.api.setStudent()
  }

  user: User | undefined
  userDetails: StudentDetails | undefined
  proposals: Proposal[] = []
  selectedProposal: object | null = null;
  searchValue: string = "";
  professorsHover = false
  professors: any;
  professorsSearchValue = "";
  selectedProfs: any[] = []
  proposalParams: ProposalsParams = {
    text: null,
    supervisors: null,
    cosupervisors: null,
    expirationDate: null,
    abroad: null
  }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user') || '{}')
    this.api.getUserDetails(this.user?.userId).then((response: any) => {
      this.userDetails = response
    })
    this.api.getAllProposals(null).then((response: any) => {
      this.proposals = response
      console.log(this.proposals)
    })
    this.api.getProfessors().then((response: any) => {
      this.professors = response
      console.log(this.professors)
    })
  }

  updateSearchValue(value: string) {
    this.searchValue = value.trim().toLowerCase();
  }

  updateProfessorsSearchValue(name: string) {
    this.professorsSearchValue = name.trim().toLowerCase();
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

  selectProposal(proposal: any) {
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
      if (!!error){
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
  }
}

type Project = {
  title: string,
  name: string
};
