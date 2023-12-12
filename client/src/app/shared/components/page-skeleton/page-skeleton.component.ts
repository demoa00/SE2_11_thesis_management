import {Component, ContentChild, EventEmitter, Injectable, Input, Output} from '@angular/core';
import {Router} from "@angular/router";
import {APIService} from "../../services/api.service";
import {User} from "../../classes/user";
import {StudentDetails} from "../../classes/student/student-details";
import {DarkModeService} from "../../services/dark-mode.service";
import {ProfessorDetails} from "../../classes/professor/professor-details";

@Component({
  selector: 'app-page-skeleton',
  templateUrl: './page-skeleton.component.html',
  styleUrls: ['./page-skeleton.component.scss']
})


@Injectable({
  providedIn: 'root'
})


export class PageSkeletonComponent {

  constructor(private _router: Router, private api: APIService, private darkMode: DarkModeService) {}

  currentRoute = this._router.url;

  @Input() trigger: boolean = false
  @Output() profilePage = new EventEmitter<boolean>();

  user: User | undefined;
  student: StudentDetails | undefined;
  professor: ProfessorDetails | undefined;

  theme = false
  menuOpen = false
  logout() {
    let user= localStorage.getItem('user')
    localStorage.removeItem('user')
    this.api.logout(JSON.parse(user!=null?user:'').userId);
  }

  ngOnInit(){
    this.api.checkAutorization()
    this.user = JSON.parse(localStorage.getItem('user') || '{}')
    if(this.user?.role=='student'){
      this.api.getUserDetails(this.user?.userId).then((response: any)=>{
        this.student = response
      })
    }
    else if(this.user?.role=='professor'){
      this.api.getProfessorDetails(this.user?.userId).then((response: any)=>{
        console.log(response)
        this.professor = response
      })
    }
    else {
    }
  }

  ngOnChanges() {
    this.closeMenu()
  }

  openMenu() {
    this.menuOpen = true
  }

  closeMenu() {
    this.menuOpen = false
  }

  goToProfile() {
    this.profilePage.emit(true)
  }

}
