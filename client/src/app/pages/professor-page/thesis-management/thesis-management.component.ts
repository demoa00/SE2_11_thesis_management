import { Component } from '@angular/core';

@Component({
  selector: 'app-thesis-management',
  templateUrl: './thesis-management.component.html',
  styleUrls: ['./thesis-management.component.css']
})
export class ThesisManagementComponent {
  createPopup: boolean = false;
  response = undefined;
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

  OpenCreatePopup() {
    this.createPopup = !this.createPopup;
    this.requestAccepted = false;
    this.response = undefined;
  }

  insertThesis() {
    let thesis = {
      title: this.title,
      supervisor: this.supervisor,
      coSupervisor: this.coSupervisor,
      level: this.level,
      type: this.type,
      groups: this.groups,
      description: this.description,
      requiredKnoledge: this.requiredKnoledge,
      notes: this.notes,
      keywords: this.keywords,
      courseType: this.courseType,
      data: this.data
    }
    console.log(thesis)
  }
}
