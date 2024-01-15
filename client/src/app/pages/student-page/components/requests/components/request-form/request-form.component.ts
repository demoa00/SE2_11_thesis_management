import {Component, EventEmitter, Input, Output} from '@angular/core';
import {APIService} from "../../../../../../shared/services/api.service";
import {ProfessorDetails} from "../../../../../../shared/classes/professor/professor-details";

@Component({
  selector: 'app-request-form',
  templateUrl: './request-form.component.html',
  styleUrl: './request-form.component.scss'
})
export class RequestFormComponent {

  constructor(private api: APIService) {
  }

  @Input() title = ""
  @Input() description = ""
  @Input() professorId = ""
  @Output() showPopup = new EventEmitter<boolean>()
  @Output() showAlert = new EventEmitter<string>();

  professors: ProfessorDetails[] = []

  ngOnInit(): void {
    this.api.getProfessors().then((res: any) => {
      this.professors = res
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
      title: this.title,
      description: this.description,
      supervisor: {
        professorId: this.professorId
      }
    }
    this.api.postThesisRequest(body).then((_res: any) => {
      this.showAlert.emit('success')
      this.cancel()
    }).catch((err: any) => {
      this.showAlert.emit('danger')
      console.log(err)
    })
  }

  checkFields(): boolean {
    return !!this.title && !!this.description && !!this.professorId
  }

}
