import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {APIService} from "../../../../shared/services/api.service";

@Component({
  selector: 'app-create-thesis-form',
  templateUrl: './create-thesis-form.component.html',
  styleUrls: ['./create-thesis-form.component.scss']
})
export class CreateThesisFormComponent {
  myForm: FormGroup;
  error = false;
  selectFocus: boolean = false;
  keywordsList: string[] = [];
  degrees:{
    titleDegree: any;
    degreeId:any;
  }[] =[];
  coSupervisors:{
    externalCoSupervisorId: any;
    name:any;
    surname:any;
    self:any,
  }[] =[];
  selectedCoSupervisors:{
    externalCoSupervisorId: any;
    name:any;
    surname:any;
    self:any,
  }[] =[];
  professor:{
    codDepartment:any;
    codGroup:any;
    email:any;
    professorId:any;
    self:any;
    name: any;
    surname:any;
  };
  selectedKWs: String[] = [];

  @Input()
  thesisProposal: any;
  @Output()
  requestAccepted= new EventEmitter<boolean>();
  @Output()
  response= new EventEmitter<{}>();




  constructor(private fb: FormBuilder, private api: APIService) {
    let stringProfessor= localStorage.getItem('professor');
    let stringDegree = localStorage.getItem('degrees');
    let stringCoSupervisors = localStorage.getItem('externalCoSupervisors');
    this.degrees = (JSON.parse(stringDegree!=null?stringDegree:'[]'));
    this.professor = (JSON.parse(stringProfessor!=null?stringProfessor:'{}'));
    this.coSupervisors = (JSON.parse(stringCoSupervisors!=null?stringCoSupervisors:'[]'));
      this.myForm = this.fb.group({
          title: ['', [Validators.required]],
          supervisor: this.professor,
          coSupervisor: [''],
          level: ['', [Validators.required]],
          thesisType: ['', [Validators.required]],
          groups: [this.professor.codGroup],
          description: ['', [Validators.required]],
          requirements: ['', [Validators.required]],
          notes: [''],
          keywords: ['', [Validators.required]],
          CdS: ['', [Validators.required]],
          expirationDate: ['', [Validators.required]]
      });
  }

    async onSubmit() {
        if (this.myForm.valid) {
          console.log(this.myForm.value);
            const response = await this.api.insertNewThesis(this.myForm.value)
            // Handle form submission
            this.requestAccepted.emit(response !=undefined);
            this.response.emit({});
        }
    }

    onSelectFocus() {
        this.selectFocus = true;
    }

    onSelectBlur() {
        this.selectFocus=false
    }
    get supervisorName() {
      console.log(this.myForm.get('supervisor')?.value?.name || '')
      return this.myForm.get('supervisor')?.value?.name || '';
    }

    addKeyword(event: any) {
        event.preventDefault(); // Evita che il tasto "Invio" faccia scattare il submit del form

        const keywordsControl = this.myForm.get('keywords');
        const keywordValue = keywordsControl?.value.trim();

        if (keywordValue) {
            this.keywordsList.push(keywordValue);
            keywordsControl?.setValue(''); //Resetta il campo delle keywords
        }
    }

    removeKeyword(event:any) {
        let keyword = event.target.textContent
        const index = this.keywordsList.indexOf(keyword);
        if (index !== -1) {
            this.keywordsList.splice(index, 1);
        }
    }

  onSelectCoSupervisorChange(event: any) {
    console.log(event.target.value)
    let cosupervisor = this.coSupervisors.find(elemento => elemento.externalCoSupervisorId==event.target.value)
    this.coSupervisors = this.coSupervisors.filter(elemento => elemento.externalCoSupervisorId!=event.target.value)
    this.selectedCoSupervisors.push(cosupervisor?cosupervisor:{
      externalCoSupervisorId: '',
      name:'',
      surname:'',
      self:'',
    })
  }
  removeCoSupervisor(event: any){
    const valoreDiv = event.target.textContent;
    let cosupervisor = this.selectedCoSupervisors.find(elemento => elemento.name==valoreDiv.split(' ')[0] && elemento.surname==valoreDiv.split(' ')[1])
    this.selectedCoSupervisors = this.selectedCoSupervisors.filter(elemento => elemento.externalCoSupervisorId!=cosupervisor?.externalCoSupervisorId)
    this.coSupervisors.push(cosupervisor?cosupervisor:{
      externalCoSupervisorId: '',
      name:'',
      surname:'',
      self:'',
    })


  }
}
