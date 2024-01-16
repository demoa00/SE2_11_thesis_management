import {Component, EventEmitter, Input, Output} from '@angular/core';
import {APIService} from "../../../../shared/services/api.service";

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
  selector: 'app-proposals',
  templateUrl: './proposals.component.html',
  styleUrl: './proposals.component.scss'
})
export class ProposalsComponent {

  constructor(private api: APIService) {
  }

  searchValue: string = "";
  professorsHover = false
  professorsSearchValue = "";
  professors: any;
  selectedProfs: any[] = []
  showFilters = false;
  applications: any
  @Input() proposals: Proposal[] = []
  @Output() selectedProposal = new EventEmitter<any>()
  @Output() canApply = new EventEmitter<boolean>()


  proposalParams: ProposalsParams = {
    text: null,
    supervisors: null,
    cosupervisors: null,
    extCs: null,
    expirationDate: null,
    abroad: null
  }

  ngOnInit() {
    console.log("NG ON INIT")
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

  updateSearchValue(value: string) {
    this.searchValue = value.trim().toLowerCase();
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

  selectProposal(proposalId: number) {
    this.api.getProposal(proposalId).then((response: any) => {
      this.selectedProposal.emit(response)
    })
    this.canApply.emit(true)
    if (this.applications !== undefined) {
      this.applications.forEach((application: any) => {
        if (application.thesisProposalId === proposalId) {
          this.canApply.emit(false)
        }
      })
    }
  }
}
