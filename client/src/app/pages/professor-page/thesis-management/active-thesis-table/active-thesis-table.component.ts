import {Component, Input} from '@angular/core';
import {APIService} from "../../../../shared/services/api.service";

@Component({
  selector: 'app-active-thesis-table',
  templateUrl: './active-thesis-table.component.html',
  styleUrls: ['./active-thesis-table.component.scss']
})
export class ActiveThesisTableComponent {

  @Input()
  rows:any;

  createPopup: boolean = false;
  response :any;
  requestAccepted: boolean = false;
  selectedProposal: any;


  constructor(private api:APIService) {
  }

  openCreatePopup() {
    this.createPopup = !this.createPopup;
    this.requestAccepted = false;
    this.response = undefined;
  }

  shohDetails(row: any) {
    this.api.getProposal(row.thesisProposalId).then((response: any) => {
      this.selectedProposal = response
    })
  }
}
