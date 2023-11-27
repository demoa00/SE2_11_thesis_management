import { Component } from '@angular/core';

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
  applicantsRow:{}[] = [{nome:'Claudio Montanari', matricola:314461, titoloTesi:'AI'},{nome:'Massimo Decimo Meridio', matricola:314251, titoloTesi:'AI - nuovo universo'},
    {nome:'Carlo Bianchi', matricola:315851, titoloTesi:'AI - nuovo universo'},{nome:'Luca Verdi', matricola:314249, titoloTesi:'Machine Learning - Troppi Dati'},
    {nome:'Massimo Rossi', matricola:317453, titoloTesi:'Cloud in the envoironment'},{nome:'Giorgio Rosi', matricola:314254, titoloTesi:'Machine Learning - Find the right pattern'},
    {nome:'Carlo verdi', matricola:314253, titoloTesi:'AI - nuovo universo'},{nome:'George Lucas', matricola:314259, titoloTesi:'Cloud in the envoironment'}];
  activeThesesRow:{}[] = [{title:'AI', type: 'company', expiration: '25/05/2024'}, {title:'AI - nuovo universo', type: 'experimental', expiration: '25/05/2023'},
    {title:'Machine Learning - Troppi Dati', type: 'company', expiration: '25/06/2024'}, {title:'Cloud in the envoironment', type: 'company', expiration: '25/06/2023'}]
  archivedTheses:{}[] = []

  openCreatePopup() {
    this.createPopup = !this.createPopup;
    this.requestAccepted = false;
    this.response = undefined;
  }

  showApplicantsTable() {
    this.showApplicants = true;
    this.showActiveTheses = false;
    this.showArchivedTheses = false
  }
  showActiveThesesTable() {
    this.showApplicants = false;
    this.showActiveTheses = true;
    this.showArchivedTheses = false
  }
  showArchivedThesesTable() {
    this.showApplicants = false;
    this.showActiveTheses = false;
    this.showArchivedTheses = true
  }
}
