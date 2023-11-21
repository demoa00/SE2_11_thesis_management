import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Router} from "@angular/router";
import {APIService} from "../../services/api.service";

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})

export class LoginFormComponent {

  @Input() showAlert: boolean = false

  @Output() alertEmitter = new EventEmitter<boolean>();

  email: string = "";
  password: string = "";

  studentEmail: string = "s123456";
  studentPassword: string = "password";

  professorEmail: string = "p123456";
  professorPassword: string = "password";

  loginFailed = false;

  constructor(private _router: Router, private api: APIService) { }

  login() {
    // if (this.email == this.studentEmail && this.password == this.studentPassword) {
    //   this._router.navigate(['/student']);
    // } else if (this.email == this.professorEmail && this.password == this.professorPassword) {
    //   this._router.navigate(['/professor']);
    // } else {
    //   this.alertEmitter.emit(true)
    //   // this.showAlert = true;
    //   this.loginFailed = true;
    //   setTimeout(() => {
    //     this.alertEmitter.emit(false)
    //     // this.showAlert = false;
    //   }, 3000)
    // }
    this.api.login(this.email, this.password)
  }

  updateEmail(email: string) {
    this.email = email.trim();
  }

  updatePassword(password: string) {
    this.password = password.trim();
  }
}
