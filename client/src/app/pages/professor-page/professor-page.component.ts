import {Component} from '@angular/core';
import {APIService} from "../../shared/services/api.service";

@Component({
  selector: 'app-professor-page',
  templateUrl: './professor-page.component.html',
  styleUrls: ['./professor-page.component.scss']
})
export class ProfessorPageComponent{
  appPage: boolean = false;
  requestPage: boolean = false;
  thesisPage: boolean = false;

  constructor(public api: APIService ) {
    this.api.setProfessor()
    this.api.getProfessors()
    this.api.getDegrees()
    this.api.getExternalCoSupervisors()
  }


  menuItems = [
    { id: 1, hover: false, selected: true  },
    { id: 2, hover: false, selected: false },
    { id: 3, hover: false, selected: false }
  ];
  selectMenuItem(id: number) {
    this.menuItems.forEach(item => {
      item.selected = item.id === id;
    });
  }

  goToApplicationPage(e: boolean) {
    if (e) {
      this.appPage =!this.appPage
    }
  }

  goToRequestPage(e: boolean) {
    if (e) {
      this.requestPage =!this.requestPage

    }
  }

  goToThesisPage(e: boolean) {
    if (e) {
      this.thesisPage =!this.thesisPage

    }
  }
}
