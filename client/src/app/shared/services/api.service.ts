import {Injectable} from '@angular/core';
import {HttpService} from "./http.service";
import {Router} from "@angular/router";

type ProposalsParams = {
  text: string | null;
  supervisors: any [] | null;
  cosupervisors: any[] | null;
  expirationDate: string | null;
  abroad: boolean | null;
}

@Injectable({
  providedIn: 'root'
})
export class APIService {

  constructor(private httpService: HttpService, private router: Router) {
  }

  login(username: string, password: string) {
    this.httpService.formPost('authenticatedSession', {username, password}).then((response) => {
      console.log("response")
      console.log(response);
    }).catch((error) => {
      console.log("error")
      console.log(error);
    })
  }

  logout(userId: any) {
    window.location.href = `http://localhost:3000/api/authenticatedSession/${userId}`;
  }

  checkAutorization() {
    this.httpService.get('authenticatedSession/current', false, true).then((response: any) => {
      localStorage.setItem('user', JSON.stringify(response));
      if (response.role == 'student') {
        this.router.navigateByUrl('student')
      } else if (response.role == 'professor') {
        this.router.navigateByUrl('professor')
      } else {
        window.location.href = `http://localhost:3000/api/authenticatedSession`;
      }
      return (response)
    }).catch((error) => {
      console.log(error)
      window.location.href = `http://localhost:3000/api/authenticatedSession`;
    })
  }

  async insertNewThesis(body: {}) {
    return await this.httpService.post('thesisProposals', body)
  }

  async getApplications() {
    return await this.httpService.get('applications')
  }

  async getApplicationById(applicationId: any, userId: any) {
    return await this.httpService.get(`applications/${applicationId}/${userId}`)
  }

  async setProfessor() {
    let user = localStorage.getItem('user')
    await this.httpService.get(`professors/${(JSON.parse(user != null ? user : '').userId)}`, false, true).then((response: any) => {
      localStorage.setItem('professor', JSON.stringify(response));
    })
  }

  async setStudent() {
    let user = localStorage.getItem('user')
    await this.httpService.get(`students/${(JSON.parse(user != null ? user : '').userId)}`, false, true).then((response: any) => {
      localStorage.setItem('student', JSON.stringify(response));
    })
  }

  async getDegrees() {
    await this.httpService.get('degrees/', false, true).then((response: any) => {
      localStorage.setItem('degrees', JSON.stringify(response))
    })
  }
  async getExternalCoSupervisors() {
    return await this.httpService.get('externalCoSupervisors/',false,true).then((response: any)=>{
      localStorage.setItem('externalCoSupervisors',JSON.stringify(response))
      return response
    })
  }

  async getCoSupervisors() {
    return await this.httpService.get('professors/?cosupervisor=true',false,true).then((response: any)=>{
      localStorage.setItem('coSupervisors',JSON.stringify(response))
      return response
    })
  }
  async getAllActiveTheses() {
    return await this.httpService.get('thesisProposals/?cosupervisor=false')
  }

  async getUserDetails(userId: any) {
    return await this.httpService.get(`students/${userId}`, false, true);
  }

  async getProfessorDetails(userId: any) {
    return await this.httpService.get(`professors/${userId}`, false, true);
  }

  async getAllProposals(params: ProposalsParams | null) {
    let url = 'thesisProposals/?'
    console.log(params)
    if (params) {
      if (params.supervisors !== null) {
        for (let s of params.supervisors) {
          url += `supervisor=${s?.professorId}&`
        }
      }
      if (params.cosupervisors !== null) {
        console.log(params.cosupervisors)
        for (let cs of params.cosupervisors) {
          let id = cs?.professorId === undefined ? cs?.externalCoSupervisorId : cs?.professorId
          url += `cosupervisor=${id}&`
        }
      }
      if(params.expirationDate !== null) {
        url += `expirationdate=${params.expirationDate}&`
      }
      if(params.abroad !== null) {
        url += `abroad=${params.abroad}&`
      }
      if (params.text !== null) {
        url += `text=${params.text}&`
      }
    }
    console.log(url)
    return await this.httpService.get(url, false, true)
  }

  async getProposal(proposalId: number | undefined) {
    return await this.httpService.get(`thesisProposals/${proposalId}`, false, true)
  }

  async getProfessors() {
    await this.httpService.get('professors',false,true).then((response: any)=>{
      localStorage.setItem('professors',JSON.stringify(response))
    })
    return await this.httpService.get('professors')
  }

  async getSupervisors() {
    return await this.httpService.get('professors/?cosupervisor=false')
  }

  async insertNewApplication(body: any) {
    return await this.httpService.post(`thesisProposals/${body.thesisProposalId}`, body)
  }


  async putApplication(studentId:any, thesisProposalId:any, status:'Accepted' | 'Rejected'){
    return await this.httpService.put(`applications/${thesisProposalId}/${studentId}`, {
      thesisProposalId: thesisProposalId,
      applicant: {
        studentId: studentId
      },
      status: status
    })
  }

}
