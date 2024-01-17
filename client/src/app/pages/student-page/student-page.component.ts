// @ts-ignore

import {Component, EventEmitter} from '@angular/core';
import {APIService} from "../../shared/services/api.service";

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
  selector: 'app-student-page',
  templateUrl: './student-page.component.html',
  styleUrls: ['./student-page.component.css']
})


export class StudentPageComponent {

  constructor(public api: APIService) {
    this.api.setStudent()
  }

  proposals: Proposal[] = []
  trigger: boolean = false
  profilePage: boolean = false;
  unreadCounter = 0
  newApplications: File | null = null;
  notificationsOpen: boolean = false;
  selectedProposal: any | null = null;
  selectedApplication: any | null = null;
  selectedRequest: any | null = null;
  canApply: boolean = false;
  menuItems = [
    {
      'id': 0,
      'selected': true,
      'hovered': false,
      'text': 'Proposals'
    },
    {
      'id': 1,
      'selected': false,
      'hovered': false,
      'text': 'Applications'
    },
    {
      'id': 2,
      'selected': false,
      'hovered': false,
      'text': 'Requests'
    }
  ]

  closeMenu() {
    this.trigger = !this.trigger
  }

  selectMenuItem(id: number) {
    this.selectedProposal=null
    this.selectedApplication=null
    this.closeMenu()
    this.profilePage = false;
    this.menuItems.forEach((item) => {
      item.selected = false
    })
    this.menuItems[id].selected = true
  }

  goToApplicationPage(e: boolean) {
    if (e) {
      this.selectMenuItem(1)
      this.profilePage = false

    }
  }

  goToProfilePage($event: boolean) {
    if ($event) {
      this.menuItems.forEach((item) => {
        item.selected = false
      })
      this.profilePage = true
    }
  }

  closeNotifications($event: boolean) {
    console.log($event)
    this.notificationsOpen = false
  }
}

