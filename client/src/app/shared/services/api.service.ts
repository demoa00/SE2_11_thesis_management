import { Injectable } from '@angular/core';
import {HttpService} from "./http.service";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class APIService {

  constructor(private httpService: HttpService, private router: Router) { }

  login(username: string, password: string) {
    this.httpService.formPost('authenticatedSession', { username, password }).then((response) => {
      console.log("response")
      console.log(response);
    }).catch((error) => {
      console.log("error")
      console.log(error);
    })
  }
  logout(userId:any) {
    window.location.href = `http://localhost:3000/api/authenticatedSession/${userId}`;
  }

  checkAutorization() {
    this.httpService.get('authenticatedSession/current',false,true).then((response: any)=>{
      localStorage.setItem('user',JSON.stringify(response));
      if(response.role=='student'){
        this.router.navigateByUrl('student')
      }
      else if(response.role=='professor'){
        this.router.navigateByUrl('professor')
      }
      else {
        window.location.href = 'http://localhost:3000/api/authenticatedSession';
      }
      return(response)
    }).catch((error)=>{
      console.log(error)
      window.location.href = 'http://localhost:3000/api/authenticatedSession';
    })
  }
  async insertNewThesis(body: {}){
    return await this.httpService.post('thesisProposals', body)
  }
  async getAllApplications(){
    return await this.httpService.get('applications')
  }
  async getAllActiveTheses(){
    return await this.httpService.get('thesisProposals')
  }
}
