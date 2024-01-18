import {Component, EventEmitter, Input, OnChanges, OnInit, Output, signal, ViewChild} from '@angular/core';
import {APIService} from "../../../../../../shared/services/api.service";
import {ProfessorDetails} from "../../../../../../shared/classes/professor/professor-details";

@Component({
  selector: 'app-request-form',
  templateUrl: './request-form.component.html',
  styleUrl: './request-form.component.scss'
})
export class RequestFormComponent implements OnChanges {

  constructor(private api: APIService) {
  }

  @Input() title = ""
  @Input() description = ""
  @Input() professorId = ""
  @Input() coSupervisor: any[] = []
  @Output() showPopup = new EventEmitter<boolean>()
  @Output() showAlert = new EventEmitter<string>();
  @Input() message: string = "";

  professorsHover = false
  coSupervisorHover = false
  supervisors: any[] = []
  coSupervisors: any
  selectedSupervisor: any = this.professorId && this.professorId.length > 0 ? this.professorId : ""
  selectedCoSupervisors: any[] = this.coSupervisor && this.coSupervisor.length > 0 ? this.coSupervisor : [];
  @Input() update: boolean = false;
  @Input() thesisRequestId!: any;
  @Input() thesisProposalId: any = null;

  ngOnInit(){
    this.api.getProfessors().then((res: any) => {
      this.supervisors = res
    }).catch((err: any) => {
      console.log(err)
    })
    this.api.getCoSupervisors().then((res: any) => {
      this.coSupervisors = res
    }).catch((err: any) => {
      console.log(err)
    })
  }

  ngOnChanges(): void {
    this.api.getProfessors().then((res: any) => {
      this.supervisors = res
      if (this.professorId !== "") {
        this.selectedSupervisor = this.supervisors.find((item) => {
          return item.professorId === this.professorId;
        })
      }
    }).catch((err: any) => {
      console.log(err)
    })
    this.api.getCoSupervisors().then((res: any) => {
      this.coSupervisors = res
      if(this.coSupervisor.length > 0) {
        this.selectedCoSupervisors = this.coSupervisors.filter((item: any) => {
          return this.coSupervisor.some((cs: any) => {
            return cs.coSupervisorId === item.professorId;
          })
        })
      }
    }).catch((err: any) => {
      console.log(err)
    })
  }

  cancel() {
    console.log("cancel")
    this.title = ""
    this.description = ""
    this.professorId = ""
    this.showPopup.emit(false)
  }

  submit(e: SubmitEvent) {
    e.preventDefault()
    console.log("submit")
    const body = {
      thesisRequestId: this.thesisRequestId,
      thesisProposalId: this.thesisProposalId,
      title: this.title,
      description: this.description,
      supervisor: {professorId: this.selectedSupervisor.professorId},
      coSupervisors: this.selectedCoSupervisors.map((cs) => {
        return {
          coSupervisorId: cs.professorId
        }
      })
    }
    if (this.update) {
      this.api.putThesisRequestStudent(body).then((_res: any) => {
        this.showAlert.emit('success')
        this.cancel()
      }).catch((err: any) => {
        this.showAlert.emit('danger')
        console.log(err)
      })
    } else {
      this.api.postThesisRequest(body).then((_res: any) => {
        this.showAlert.emit('success')
        this.cancel()
      }).catch((err: any) => {
        this.showAlert.emit('danger')
        console.log(err)
      })
    }
  }

  checkFields(): boolean {
    return !!this.title && !!this.description && !!this.professorId
  }

  toggleProf(prof: any) {
    console.log(prof)
    this.selectedSupervisor = prof;
    this.professorId = prof.professorId;
  }

  toggleCoSupervisor(prof: any) {
    if (this.selectedCoSupervisors.some((item) => {
      return item.professorId === prof.professorId;
    })) {
      this.selectedCoSupervisors = this.selectedCoSupervisors.filter((item) => {
        return item.professorId !== prof.professorId;
      })
    } else {
      this.selectedCoSupervisors.push(prof);
    }
  }

  isProfSelected(prof: any) {
    if (this.selectedSupervisor !== undefined) {
      return this.selectedSupervisor.professorId === prof.professorId;
    }
    return false;
  }

  isCoSupervisorSelected(prof: any) {
    return this.selectedCoSupervisors.some((item) => {
      return item.professorId === prof.professorId;
    })
  }

  selectedCoSupervisorsNames() {
    return this.selectedCoSupervisors.map((item) => {
      return item.name + " " + item.surname;
    }).join(", ");
  }

}
