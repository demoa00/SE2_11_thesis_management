import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {APIService} from "../../services/api.service";

@Component({
  selector: 'app-page-skeleton',
  templateUrl: './page-skeleton.component.html',
  styleUrls: ['./page-skeleton.component.scss']
})
export class PageSkeletonComponent {

  constructor(private _router: Router, private api: APIService) {}

  currentRoute = this._router.url;

  logout() {
    let user= localStorage.getItem('user')
    localStorage.removeItem('user')
    this.api.logout(JSON.parse(user!=null?user:'').userId);

  }
}
