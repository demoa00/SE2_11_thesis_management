import {Injectable} from '@angular/core';
import {HttpService} from "./http.service";
import {Router} from "@angular/router";

type ProposalsParams = {
    text: string | null;
    supervisors: any [] | null;
    cosupervisors: {}[] | null;
    expirationDate: string | null;
    abroad: boolean | null;
}
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
        window.location.href = `http://localhost:3000/api/authenticatedSession`;
      }
      return(response)
    }).catch((error)=>{
      console.log(error)
      window.location.href = `http://localhost:3000/api/authenticatedSession`;
    })
  }
  async insertNewThesis(body: {}){
    return await this.httpService.post('thesisProposals', body)
  }
  async getAllApplications(){
    return await this.httpService.get('applications')
  }
  async setProfessor(){
    let user= localStorage.getItem('user')
    await this.httpService.get(`professors/${(JSON.parse(user!=null?user:'').userId)}`,false,true).then((response: any)=>{
      localStorage.setItem('professor',JSON.stringify(response));
    })
  }
  async setStudent(){
    let user= localStorage.getItem('user')
    await this.httpService.get(`students/${(JSON.parse(user!=null?user:'').userId)}`,false,true).then((response: any)=>{
      localStorage.setItem('student',JSON.stringify(response));
    })
  }
  async getDegrees(){
    await this.httpService.get('degrees/',false,true).then((response: any)=>{
      localStorage.setItem('degrees',JSON.stringify(response))
    })
  }
  async getAllActiveTheses(){
    return await this.httpService.get('thesisProposals')
  }

  async getUserDetails(userId: any) {
    return await this.httpService.get(`students/${userId}`, false, true);
  }

  async getProfessorDetails(userId: any) {
    return await this.httpService.get(`professors/${userId}`, false, true);
  }


  async getAllProposals(params: ProposalsParams | null){
    let url = 'thesisProposals/?'
    console.log(params)
    if(params){
      if(params.supervisors !== null){
        for (let s of params.supervisors){
          url += `supervisor=${s?.professorId}&`
        }
      }
      if(params.text !== null){
        url += `text=${params.text}&`
      }
    }
      return await this.httpService.get(url,false,true)
  }

  async getProposal(proposalId: number | undefined) {
    return await this.httpService.get(`thesisProposals/${proposalId}`,false,true)
  }

  async getProfessors() {
    return await this.httpService.get('professors')
  }

}
