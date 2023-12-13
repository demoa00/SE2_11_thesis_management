import {Component} from '@angular/core';
import {APIService} from "../services/api.service";
import {JsonPipe, NgForOf} from "@angular/common";
import {StudentDetails} from "../classes/student/student-details";

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
  career: { userId: number, exams: any[] } = {userId: 0, exams: []}
  cv: File = new File([], '')
  showPopup = false
  ngOnInit() {
    this.api.getUserDetails(this.userId).then((response: any) => {
      this.user = response
      this.cv = new File([], response.cv)
    })
    this.api.getCareer(this.userId).then((response: any) => {
      this.career = response
    })
  }

  loadFile(file: any) {
    const formData = new FormData();
    formData.append('file', this.cv);
    console.log(formData.get('file'))
    this.api.postCv(formData).then(r => {
      console.log(r)
      this.cv = file.target.files[0]
    }).catch(e => {
      console.log(e)
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


  deleteCv() {
    this.api.deleteCv(this.userId).then(r => {
      console.log(r)
      this.showPopup = false
      this.cv = new File([], '')
    }).catch(e => {
      console.log(e)
    })
  }

}
