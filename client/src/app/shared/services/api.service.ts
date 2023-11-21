import { Injectable } from '@angular/core';
import {HttpService} from "./http.service";

@Injectable({
  providedIn: 'root'
})
export class APIService {

  constructor(private httpService: HttpService) { }

  login(username: string, password: string) {
    this.httpService.formPost('authenticatedSession', { username, password }).then((response) => {
      console.log("response")
      console.log(response);
    }).catch((error) => {
      console.log("error")
      console.log(error);
    })
  }



}
