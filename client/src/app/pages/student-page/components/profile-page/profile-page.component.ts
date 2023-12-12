import {Component} from '@angular/core';
import {APIService} from "../../../../shared/services/api.service";
import {JsonPipe, NgForOf} from "@angular/common";
import {StudentDetails} from "../../../../shared/classes/student/student-details";

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss'
})
export class ProfilePageComponent {
  constructor(private api: APIService) {
  }

  userId = JSON.parse(localStorage.getItem('user') || '{}').userId
  user: StudentDetails = new StudentDetails()
  career: {userId: number, exams: any[]} = {userId: 0, exams: []}
  cv: File = new File([], '')
  ngOnInit() {
    this.api.getUserDetails(this.userId).then((response: any) => {
      this.user = response
      this.cv = new File([], response.cv)
    })
    this.api.getCareer(this.userId).then((response: any) => {
      this.career = response
    })
  }

  loadFile(file:any) {
    this.cv = file.target.files[0]
    let body = {
      file: this.cv
    }
    this.api.postCv(body).then(r => {
      console.log(r)
    }).catch(e => {
      console.log(e)
    })
  }

}
