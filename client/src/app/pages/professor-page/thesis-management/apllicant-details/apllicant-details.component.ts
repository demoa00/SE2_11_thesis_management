import {Component, EventEmitter, Input, Output} from '@angular/core';
import {APIService} from "../../../../shared/services/api.service";
import {StudentDetails} from "../../../../shared/classes/student/student-details";

@Component({
  selector: 'app-apllicant-details',
  templateUrl: './apllicant-details.component.html',
  styleUrl: './apllicant-details.component.scss'
})
export class ApllicantDetailsComponent {

  constructor(private api: APIService) {
  }

  @Input()
  userId:any
  @Input()
  thesisId:any
  @Output()
  triggerBack: EventEmitter<void> = new EventEmitter<void>();
  @Output()
  triggerAccept: EventEmitter<void> = new EventEmitter<void>();
  @Output()
  triggerReject: EventEmitter<void> = new EventEmitter<void>();

  application:any;
  user: StudentDetails = new StudentDetails()
  career: { userId: number, exams: any[] } = {userId: 0, exams: []}
  cv: File = new File([], '')

  async ngOnInit() {
    this.application = await this.api.getApplicationById(this.thesisId, this.userId)
    console.log(this.application)
    this.api.getUserDetails(this.userId).then((response: any) => {
      this.user = response
      this.cv = new File([], response.cv)
    })
    this.api.getCareer(this.userId).then((response: any) => {
      this.career = response
    })
  }

  getCv() {
    this.api.getCv(this.userId).then(r => {
      console.log(r)
      let url = window.URL;
      let link = url.createObjectURL(r)
      let cv = document.createElement('a')
      cv.setAttribute("download", this.cv.name)
      cv.setAttribute("href", link)
      document.body.appendChild(cv)
      cv.click()
      document.body.removeChild(cv)
      // window.open(link)
    }).catch(e => {
      console.log(e)
    })
  }
  openCv() {
    this.api.getCv(this.userId).then(r => {
      console.log(r)
      let url = window.URL;
      let link = url.createObjectURL(r)
      window.open(link, '_blank');
    }).catch(e => {
      console.log(e)
    })
  }
}
