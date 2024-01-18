import {Component, HostListener, Output} from '@angular/core';
import {APIService} from "../../shared/services/api.service";

@Component({
  selector: 'app-secretary-page',
  templateUrl: './secretary-page.component.html',
  styleUrl: './secretary-page.component.scss'
})
export class SecretaryPageComponent {

  constructor(private api: APIService) {
  }

  selectedRequest: any = null

  menuItems = [
    {
      'id': 0,
      'selected': true,
      'hovered': false,
      'text': 'Requests'
    },
  ]

  selectMenuItem(id: number) {
    this.selectedRequest = null
    this.menuItems.forEach((item) => {
      item.selected = false
    })
    this.menuItems[id].selected = true
  }

}
