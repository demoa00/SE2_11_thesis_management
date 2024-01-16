import {Component} from '@angular/core';
import {APIService} from "../../shared/services/api.service";

@Component({
  selector: 'app-secretary-page',
  templateUrl: './secretary-page.component.html',
  styleUrl: './secretary-page.component.scss'
})
export class SecretaryPageComponent {

  constructor(private api: APIService) {}

  requests: any = null
  menuItems = [
    {
      'id': 0,
      'selected': true,
      'hovered': false,
      'text': 'Requests'
    },
  ]

  ngOnInit() {
    this.api.getThesisRequests().then((response: any) => {
      console.log(response)
      this.requests = response
    }).catch((error) => {
      console.log(error)
      this.requests = null
    })
  }

  selectMenuItem(id: number) {
    this.menuItems.forEach((item) => {
      item.selected = false
    })
    this.menuItems[id].selected = true
  }
}
