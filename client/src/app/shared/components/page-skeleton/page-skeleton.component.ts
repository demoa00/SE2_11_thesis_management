import {
  Component,
  EventEmitter,
  Injectable,
  Input,
  Output
} from '@angular/core';
import {Router} from "@angular/router";
import {APIService} from "../../services/api.service";
import {User} from "../../classes/user";
import {StudentDetails} from "../../classes/student/student-details";
import {ProfessorDetails} from "../../classes/professor/professor-details";
import {MatDatepickerInputEvent} from "@angular/material/datepicker";

@Component({
  selector: 'app-page-skeleton',
  templateUrl: './page-skeleton.component.html',
  styleUrls: ['./page-skeleton.component.scss']
})


@Injectable({
  providedIn: 'root'
})


export class PageSkeletonComponent {
  constructor(private _router: Router, private api: APIService) {
  }

  currentRoute = this._router.url;

  @Input() trigger: boolean = false
  @Input() unreadCounter = 0
  @Input() notificationsOpen = false
  @Output() profilePage = new EventEmitter<boolean>();
  @Output() notificationsOpenChange = new EventEmitter<boolean>();
  @Output() newProposals = new EventEmitter<any>();
  @Output() newApplications = new EventEmitter<any>();

  user: User | undefined;
  student: StudentDetails | undefined;
  professor: ProfessorDetails | undefined;
  secretaryClerk: any;

  theme = false
  menuOpen = false
  today = new Date()

  logout() {
    let user = localStorage.getItem('user')
    localStorage.removeItem('user')
    this.api.logout(JSON.parse(user != null ? user : '').userId);
  }

  ngOnInit() {
    this.api.checkAutorization()
    this.user = JSON.parse(localStorage.getItem('user') || '{}')
    if (this.user?.role == 'student') {
      this.api.getStudentDetails(this.user?.userId).then((response: any) => {
        this.student = response
      })
    } else if (this.user?.role == 'professor') {
      this.api.getProfessorDetails(this.user?.userId).then((response: any) => {
        console.log(response)
        this.professor = response
      })
    }
    else if(this.user?.role == 'secretary'){
      this.api.getSecretaryClerkDetails(this.user?.userId).then((response: any) => {
        console.log(response)
        this.secretaryClerk = response
      }).catch(e=>{
        console.log(e)
      })
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
    this.menuOpen = false
  }

  openNotifications() {
    this.notificationsOpen = true
    this.notificationsOpenChange.emit(this.notificationsOpen)
  }

  closeNotifications() {
    this.notificationsOpen = false
    this.notificationsOpenChange.emit(this.notificationsOpen)
  }

  selectDate($event: MatDatepickerInputEvent<any, any>) {
    let year = $event.value.getFullYear().toString()
    let month = $event.value.getMonth() + 1 < 10 ? `0${$event.value.getMonth() + 1}` : ($event.value.getMonth() + 1).toString()
    let day = $event.value.getDate() < 10 ? `0${$event.value.getDate()}` : $event.value.getDate().toString()
    let date = `${year}-${month}-${day}`
    this.api.putVirtualClock(date).then(() => {
      this.api.getAllProposals(null).then((response: any) => {
        this.newProposals.emit(response)
      }).catch((error: any) => {
        console.log(error)
      })
      this.api.getApplications().then((response: any) => {
        this.newApplications.emit(response)
      }).catch((error: any) => {
        console.log(error)
      })
    }).catch((error) => {
      console.log(error)
    })
  }
}
