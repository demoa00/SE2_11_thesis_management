import {Component, Input} from '@angular/core';
import {APIService} from "../../../../shared/services/api.service";

@Component({
  selector: 'app-archived-thesis-table',
  templateUrl: './archived-thesis-table.component.html',
  styleUrl: './archived-thesis-table.component.scss'
})
export class ArchivedThesisTableComponent {

  @Input()
  rows:any;
  deletePopup: boolean = false;
  response :any;
  requestAccepted: boolean = false;
  selectedProposal: any;
  selectedThesisId: any;



  constructor(private api:APIService) {
  }

  shohDetails(row: any) {
    this.api.getProposal(row.thesisProposalId).then((response: any) => {
      this.selectedProposal = response
    })
  }

  deleteThesisPopup() {
    this.deletePopup = !this.deletePopup;
    this.requestAccepted = false;
    this.response = undefined;
  }

  async deleteThesis() {
    this.response = await this.api.deleteThesis(this.selectedThesisId)
    if (this.response){
      this.requestAccepted = true;
    }
  }
}
