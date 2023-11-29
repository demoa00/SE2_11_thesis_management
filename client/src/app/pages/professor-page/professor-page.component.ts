import {Component} from '@angular/core';
import {APIService} from "../../shared/services/api.service";

@Component({
  selector: 'app-professor-page',
  templateUrl: './professor-page.component.html',
  styleUrls: ['./professor-page.component.scss']
})
export class ProfessorPageComponent{

  constructor(public api: APIService ) {
    this.api.setProfessor()
    this.api.getProfessors()
    this.api.getDegrees()
    this.api.getCoSupervisors()
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

}
