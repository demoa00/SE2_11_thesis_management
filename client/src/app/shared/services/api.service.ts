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
    try {
      return await this.httpService.get('applications')
    } catch (errore) {
      return undefined
    }
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
    return await this.httpService.get('externalCoSupervisors/', false, true).then((response: any) => {
      localStorage.setItem('externalCoSupervisors', JSON.stringify(response))
      return response
    })
  }

  async getCoSupervisors() {
    return await this.httpService.get('professors/?cosupervisor=true', false, true).then((response: any) => {
      localStorage.setItem('coSupervisors', JSON.stringify(response))
      return response
    })
  }

  async getAllActiveTheses() {
    try {
      const  theses: [] = await this.httpService.get('thesisProposals/?cosupervisor=false&isArchieved=false')
      return theses.map((thesis: {}) => {
        return {...thesis, coSupervised: false}
      })
    } catch (errore) {
      return undefined
    }
  }
  async getAllCoSupervisedActiveTheses () {
    try {
      const coSupervisedTheses: [] = await this.httpService.get('thesisProposals/?cosupervisor=true&isArchieved=false')
      return coSupervisedTheses.map((thesis: {}) => {
        return {...thesis, coSupervised: true}
      })
    } catch (errore) {
      return undefined
    }
  }

  async getThesisRequests() {
    try {
      const  theses: [] = await this.httpService.get('thesisRequests/?cosupervisor=false')
      return theses.map((thesis: {}) => {
        return {...thesis, coSupervised: false}
      })
    } catch (errore) {
      return undefined
    }
  }

  async getCoSupervisedThesisRequests() {
    try {
      const coSupervisedTheses: [] = await this.httpService.get('thesisRequests/?cosupervisor=true')
      return coSupervisedTheses.map((thesis: {}) => {
        return {...thesis, coSupervised: true}
      })
    } catch (errore) {
      return undefined
    }
  }
  async getAllArchivedTheses() {
    try {
      return await this.httpService.get('thesisProposals/?cosupervisor=false&isArchieved=true')
    } catch (errore) {
      return undefined
    }

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
      if (params.expirationDate !== null) {
        url += `expirationdate=${params.expirationDate}&`
      }
      if (params.abroad !== null) {
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

  async getRequest(requestId: number | undefined) {
    return await this.httpService.get(`thesisRequests/${requestId}`, false, true)
  }

  async deleteThesis(proposalId: number | undefined) {
    return await this.httpService.delete(`thesisProposals/${proposalId}`, true)
  }

  async archiveThesis(proposalId: number | undefined) {
    const thesisBody: any = await this.httpService.get(`thesisProposals/${proposalId}`, false, true)
    delete thesisBody.self
    delete thesisBody.supervisor
    //thesisBody.requirements = ' '
    console.log(thesisBody)
    return await this.httpService.put(`thesisProposals/${proposalId}/archive`, thesisBody)
  }

  async getProfessors() {
    await this.httpService.get('professors', false, true).then((response: any) => {
      localStorage.setItem('professors', JSON.stringify(response))
    })
    return await this.httpService.get('professors')
  }

  async getSupervisors() {
    return await this.httpService.get('professors/?cosupervisor=false')
  }

  async insertNewApplication(body: FormData) {
    return await this.httpService.post(`thesisProposals/${body.get("thesisProposalId")}`, body)
  }


  async putApplication(studentId: any, thesisProposalId: any, status: 'Accepted' | 'Rejected') {
    return await this.httpService.put(`applications/${thesisProposalId}/${studentId}`, {
      thesisProposalId: thesisProposalId,
      applicant: {
        studentId: studentId
      },
      status: status
    })
  }

  async postThesisRequest(body: any) {
    return await this.httpService.post('thesisRequests', body)
  }

  async putThesisRequest(professorId: any, thesisRequestId: any, status: 'Accepted' | 'Rejected' | 'Change', professorRequestChangesMessage?:any) {
    return await this.httpService.put(`thesisRequests/${thesisRequestId}`, professorRequestChangesMessage?{
      supervisor: {
        professorId: professorId
      },
      professorStatus: status,
      title:' ',
      description:' ',
      professorRequestChangesMessage: professorRequestChangesMessage,
    }:
      {
        supervisor: {
          professorId: professorId
        },
        professorStatus: status,
        title: ' ',
        description:' '
      }
    )
  }

  async getCareer(studentId: any) {
    return await this.httpService.get(`careers/${studentId}`, false, true)
  }

  async getNotifications() {
    return await this.httpService.get('notifications', false, true)
  }

  async updateNotification(notificationId: any) {
    return await this.httpService.put(`notifications/${notificationId}`, {})
  }

  async updateThesis(thesisProposalId: any, submitform: {
    coSupervisor: { coSupervisorId: any }[];
    abroad: any;
    requirements: any;
    CdS: { degreeId: any }[];
    notes: any;
    keywords: string[];
    level: any;
    thesisType: any;
    description: any;
    title: any;
    expirationDate: any
  }) {
    return await this.httpService.put(`thesisProposals/${thesisProposalId}`, submitform)
  }

  async postCv(body: any) {
    console.log(body)
    return await this.httpService.postBlob('cv', body, {
      enctype: 'multipart/form-data',
      accept: 'application/pdf',
    })
  }

  async getCv(userId: any):Promise<Blob> {
    return await this.httpService.getBlob(`cv/${userId}`, false, true)
  }

  async deleteCv(userId: any) {
    return await this.httpService.delete(`cv/${userId}`, true)
  }

  async putVirtualClock(date: string) {
    return await this.httpService.put(`virtualClock`, {date: date})
  }

}
