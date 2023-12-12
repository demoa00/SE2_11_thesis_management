import {Component, EventEmitter, Input, Output} from '@angular/core';
import {APIService} from "../../../../shared/services/api.service";

@Component({
  selector: 'app-active-thesis-table',
  templateUrl: './active-thesis-table.component.html',
  styleUrls: ['./active-thesis-table.component.scss']
})
export class ActiveThesisTableComponent {

  @Input()
  rows: any;
  @Output()
  triggerUpdate: EventEmitter<void> = new EventEmitter<void>();

  updatePopup: boolean = false;
  createPopup: boolean = false;
  archivePopup: boolean = false;
  deletePopup: boolean = false;
  response: any;
  requestAccepted: boolean = false;
  selectedProposal: any;
  selectedThesisId: any;


  constructor(private api: APIService) {
  }

  openUpdatePopup() {
    this.updatePopup = !this.updatePopup;
    this.requestAccepted = false;
    this.response = undefined;
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

  archiveThesisPopup() {
    this.archivePopup = !this.archivePopup;
    this.requestAccepted = false;
    this.response = undefined;
  }

  deleteThesisPopup() {
    console.log(this.selectedProposal)
    this.deletePopup = !this.deletePopup;
    this.requestAccepted = false;
    this.response = undefined;
  }

  async archiveThesis() {
    this.response = await this.api.archiveThesis(this.selectedThesisId)
    if (this.response){
      this.requestAccepted = true;
      }
  }

  async deleteThesis() {
    this.response = await this.api.deleteThesis(this.selectedThesisId)
    if (this.response){
      this.requestAccepted = true;
    }
  }
}
