import { Component } from '@angular/core';
import { Router} from "@angular/router";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent {
  email: string = "";
  password: string = "";

  studentEmail: string = "s123456";
  studentPassword: string = "password";

  professorEmail: string = "p123456";
  professorPassword: string = "password";

  showAlert = false;
  loginFailed = false;

  constructor(private _router: Router) { }

  login() {
    if (this.email == this.studentEmail && this.password == this.studentPassword) {
      this._router.navigate(['/student']);
    } else if (this.email == this.professorEmail && this.password == this.professorPassword) {
      this._router.navigate(['/professor']);
    } else {
      this.showAlert = true;
      this.loginFailed = true;
      setTimeout(() => {
        this.showAlert = false;
      }, 3000)
    }
  }

  updateEmail(email: string) {
    this.email = email.trim();
  }

  updatePassword(password: string) {
    this.password = password.trim();
  }
}
