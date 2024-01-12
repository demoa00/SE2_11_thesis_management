import {Component, EventEmitter, Input, Output} from '@angular/core';
import {APIService} from "../../../../../../shared/services/api.service";
import {ProfessorDetails} from "../../../../../../shared/classes/professor/professor-details";

@Component({
  selector: 'app-request-form',
  templateUrl: './request-form.component.html',
  styleUrl: './request-form.component.scss'
})
export class RequestFormComponent {

  constructor(private api: APIService) {}

  @Input() title=""
  @Input() description=""
  @Input() professor=""
  @Output() showPopup = new EventEmitter<boolean>()

  professors: ProfessorDetails[] = []

  ngOnInit(): void {
    this.api.getProfessors().then((res:any) => {
      this.professors = res
    }).catch((err:any) => {
      console.log(err)
    })
  }

  cancel(){
    console.log("cancel")
    this.title=""
    this.description=""
    this.professor=""
    this.showPopup.emit(false)
  }
  submit(e: SubmitEvent){
    e.preventDefault()
    console.log("submit")
  }

  checkFields(): boolean{
    return !!this.title && !!this.description && !!this.professor
  }

}
