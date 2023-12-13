import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {APIService} from "../../../../shared/services/api.service";

@Component({
  selector: 'app-applicants-table',
  templateUrl: './applicants-table.component.html',
  styleUrls: ['./applicants-table.component.scss']
})
export class ApplicantsTableComponent implements OnChanges{

  @Input()
  rows:any;
  @Output()
  triggerUpdate: EventEmitter<void> = new EventEmitter<void>();

  filteredRows: any[] = [];

  // Filtri
  studentFilter: string = '';
  titleFilter: string = '';
  dateFilter: string = '';
  statusFilter: string = '';
  response :any;
  requestAccepted: boolean = false;
  rejectPopup= false;
  acceptPopup= false;
  applicant:any;
  openFilter: boolean = false;
  selectedApplicant: any;

  constructor(private api: APIService) {
  }
  ngOnChanges(changes: SimpleChanges) {
    this.filteredRows = this.rows;
    this.openFilter = false;
  }

  openAcceptPopup() {
    this.acceptPopup = !this.acceptPopup;
    this.requestAccepted = false;
    this.response = undefined;
  }
  openRejectPopup() {
    this.rejectPopup = !this.rejectPopup;
    this.requestAccepted = false;
    this.response = undefined;
  }

  async rejectApplication(){
    this.response = await this.api.putApplication(this.applicant.studentId, this.applicant.thesisProposalId, 'Rejected')
    if (this.response){
      this.rows = await this.api.getApplications()
      this.requestAccepted = true;
    }
    this.applicant = undefined;
  }
  async acceptApplication(){
   this.response = await this.api.putApplication(this.applicant.studentId, this.applicant.thesisProposalId, 'Accepted')
    if (this.response){
      this.rows = await this.api.getApplications()
      this.requestAccepted = true;
    }
    this.applicant = undefined;
  }

  applyFilters() {
    const dateToCheck = this.dateFilter ? new Date(this.dateFilter) : null
    this.filteredRows = this.rows.filter((row:any) =>

      row.studentId.toLowerCase().includes(this.studentFilter.toLowerCase()) &&
      row.thesisProposalTitle.toLowerCase().includes(this.titleFilter.toLowerCase()) &&
      (dateToCheck === null || new Date(row.date).toDateString() === dateToCheck.toDateString()) &&
      (this.statusFilter === '' || row.status.toLowerCase() === this.statusFilter.toLowerCase())
    );
  }

  resetFilter() {
    this.filteredRows = this.rows
    this.openFilter = !this.openFilter
  }
}
