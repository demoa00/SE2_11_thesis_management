import { Component } from '@angular/core';
import {APIService} from "../../../shared/services/api.service";

@Component({
  selector: 'app-thesis-management',
  templateUrl: './thesis-management.component.html',
  styleUrls: ['./thesis-management.component.scss']
})
export class ThesisManagementComponent {
  createPopup: boolean = false;
  response :any;
  requestAccepted: boolean = false;
  title: string = "";
  supervisor: string = "";
  coSupervisor: string = "";
  level: string = "";
  type: string = "";
  groups: string = "";
  description: string = "";
  requiredKnoledge: string = "";
  notes: string = "";
  keywords: string = "";
  courseType: string = "";
  data : Date = new Date;

  showApplicants: boolean = false;
  showActiveTheses: boolean = false;
  showArchivedTheses: boolean = false;
  applicantsRow :any;
  activeThesesRow:any;
  archivedThesesRow:any;
  /*applicantsRow:{}[] = [{nome:'Claudio Montanari', matricola:314461, titoloTesi:'AI'},{nome:'Massimo Decimo Meridio', matricola:314251, titoloTesi:'AI - nuovo universo'},
    {nome:'Carlo Bianchi', matricola:315851, titoloTesi:'AI - nuovo universo'},{nome:'Luca Verdi', matricola:314249, titoloTesi:'Machine Learning - Troppi Dati'},
    {nome:'Massimo Rossi', matricola:317453, titoloTesi:'Cloud in the envoironment'},{nome:'Giorgio Rosi', matricola:314254, titoloTesi:'Machine Learning - Find the right pattern'},
    {nome:'Carlo verdi', matricola:314253, titoloTesi:'AI - nuovo universo'},{nome:'George Lucas', matricola:314259, titoloTesi:'Cloud in the envoironment'}];


  activeThesesRow:{}[] = [{title:'AI', type: 'company', expiration: '25/05/2024'}, {title:'AI - nuovo universo', type: 'experimental', expiration: '25/05/2023'},
    {title:'Machine Learning - Troppi Dati', type: 'company', expiration: '25/06/2024'}, {title:'Cloud in the envoironment', type: 'company', expiration: '25/06/2023'}]
  */


  constructor(private api: APIService) {
  }
  openCreatePopup() {
    this.createPopup = !this.createPopup;
    this.requestAccepted = false;
    this.response = undefined;
  }

  ngOnInit() {
    this.showActiveThesesTable();
  }

  async showApplicantsTable() {
    const response = await this.api.getApplications();
    if(response != undefined){
      this.applicantsRow = response;
      this.showApplicants = true;
      this.showActiveTheses = false;
      this.showArchivedTheses = false
    }
    else {
      this.applicantsRow = [];
      this.showApplicants = true;
      this.showActiveTheses = false;
      this.showArchivedTheses = false
    }
  }
  async showActiveThesesTable() {
    const response = await this.api.getAllActiveTheses();
    if (response != undefined) {
      this.activeThesesRow = response;
      this.showApplicants = false;
      this.showActiveTheses = true;
      this.showArchivedTheses = false
    }
    else {
      this.activeThesesRow = [];
      this.showApplicants = false;
      this.showActiveTheses = true;
      this.showArchivedTheses = false
    }
  }
  async showArchivedThesesTable() {
    const response = await this.api.getAllArchivedTheses();
    if (response != undefined) {
      this.archivedThesesRow = response;
      this.showApplicants = false;
      this.showActiveTheses = false;
      this.showArchivedTheses = true
    }
    else {
      this.archivedThesesRow = [];
      this.showApplicants = false;
      this.showActiveTheses = false;
      this.showArchivedTheses = true
    }
  }

  async updateAll() {
    const archived = await this.api.getAllArchivedTheses();
    if (archived != undefined) {
      this.archivedThesesRow = archived;
    }
    else {
      this.archivedThesesRow = [];
    }
    const active =  await this.api.getAllActiveTheses();
    if (active != undefined) {
      this.activeThesesRow = active;
    }
    else {
      this.activeThesesRow = [];
    }
    const app = await this.api.getApplications();
    if(app != undefined){
      this.applicantsRow = app;
    }
    else {
      this.applicantsRow = [];
    }
  }
}
