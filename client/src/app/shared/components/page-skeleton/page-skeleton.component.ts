import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {APIService} from "../../services/api.service";
import {User} from "../../classes/student/user";
import {StudentDetails} from "../../classes/student/student-details";
import {DarkModeService} from "../../services/dark-mode.service";

@Component({
  selector: 'app-page-skeleton',
  templateUrl: './page-skeleton.component.html',
  styleUrls: ['./page-skeleton.component.scss']
})



export class PageSkeletonComponent {

  constructor(private _router: Router, private api: APIService, private darkMode: DarkModeService) {}

  currentRoute = this._router.url;

  user: User | undefined;
  userDetails: StudentDetails | undefined;

  theme = false

  logout() {
    let user= localStorage.getItem('user')
    localStorage.removeItem('user')
    this.api.logout(JSON.parse(user!=null?user:'').userId);
  }

  ngOnInit(){
    this.api.checkAutorization()
    this.user = JSON.parse(localStorage.getItem('user') || '{}')
    this.api.getUserDetails(this.user?.userId).then((response: any)=>{
      this.userDetails = response
    })
  }

}
