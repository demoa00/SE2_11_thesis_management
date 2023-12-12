import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators
} from "@angular/forms";
import {APIService} from "../../../../shared/services/api.service";


export function customKeywordValidator(keywordsList: string[]): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    console.log(keywordsList.length)
    const keywords = control.value;

    // Check if the keywordList is empty
    if (!keywords && keywordsList.length > 0) {
      return null; // No error if the list is full
    }

    // Check if the value is required
    return Validators.required(control);
  };
}
function customCdSValidator(selectedCdS:{ titleDegree: any; degreeId:any; }[]): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {

    console.log(selectedCdS.length)
    // Check if the keywordList is empty
    if (selectedCdS.length > 0) {
      return null; // No error if the list is full
    }


    // Check if the value is required
    return Validators.required(control);
  };
}
@Component({
  selector: 'app-update-thesis-form',
  templateUrl: './update-thesis-form.component.html',
  styleUrl: './update-thesis-form.component.scss'
})
export class UpdateThesisFormComponent implements OnInit{
  myForm: FormGroup;
  error = false;
  selectFocus: boolean = false;
  keywordsList: string[] = [];
  degrees:{
    titleDegree: any;
    degreeId:any;
  }[] =[];
  selectedCdS:{
    titleDegree: any;
    degreeId:any;
  }[] =[];
  externalCoSupervisors:{
    externalCoSupervisorId: any;
    name:any;
    surname:any;
    self:any,
  }[] =[];
  professors:{
    professorId: any,
    name: any,
    surname: any,
    self: any
  }[] =[];
  selectedProfessors:{
    professorId: any;
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

  @Input()
  thesisProposal: any;
  @Output()
  requestAccepted= new EventEmitter<boolean>();
  @Output()
  response= new EventEmitter<{}>();


  ngOnInit(): void {
    if(this.thesisProposal) {
      console.log(this.thesisProposal)
      this.myForm.get('title')?.setValue(this.thesisProposal.title)
      this.myForm.get('level')?.setValue(this.thesisProposal.level)
      this.myForm.get('thesisType')?.setValue(this.thesisProposal.thesisType)
      this.myForm.get('description')?.setValue(this.thesisProposal.description)
      this.myForm.get('requirements')?.setValue(this.thesisProposal.requirements)
      this.myForm.get('expirationDate')?.setValue(this.thesisProposal.expirationDate)
      this.myForm.get('abroad')?.setValue(this.thesisProposal.abroad)
      this.myForm.get('keywords')?.setValue(this.thesisProposal.keywords.shift())
      this.selectedCdS = [...this.thesisProposal.CdS]
      if(this.thesisProposal.coSupervisor){
         this.thesisProposal.coSupervisor?.forEach((element:any)=>{
            if(element.coSupervisorId.includes('e')) {
                const cS = this.externalCoSupervisors.find((el) => el.externalCoSupervisorId === element.coSupervisorId)
                if (cS!=undefined){
                  this.selectedCoSupervisors.push(cS)
                }
            }
            else if (element.coSupervisorId.includes('p')){
                const cS = this.professors.find((el) => el.professorId === element.coSupervisorId)
                if (cS!=undefined){
                    this.selectedProfessors.push(cS)
                }
            }
        })
      }
      console.log(this.selectedCoSupervisors , this.selectedProfessors)
      if(this.thesisProposal.notes){
          this.myForm.get('notes')?.setValue(this.thesisProposal.notes)
      }
      this.keywordsList = [...this.thesisProposal.keywords]
      this.updateCdSValidator()
      console.log(this.selectedCoSupervisors)
      console.log(this.selectedProfessors)
    } else {
      console.error('thesisProposal is not defined');
    }
  }
  updateCdSValidator(): void {
    const cdsValidator = customCdSValidator(this.selectedCdS);
    this.myForm.get('CdS')?.setValidators([cdsValidator]);
    this.myForm.get('CdS')?.updateValueAndValidity();
  }

  constructor(private fb: FormBuilder, private api: APIService) {

    let stringProfessor= localStorage.getItem('professor');
    let stringDegree = localStorage.getItem('degrees');
    let stringCoSupervisors = localStorage.getItem('externalCoSupervisors');
    let stringInternalCoSupervisors = localStorage.getItem('internalCoSupervisors');
    this.degrees = (JSON.parse(stringDegree!=null?stringDegree:'[]'));
    this.professor = (JSON.parse(stringProfessor!=null?stringProfessor:'{}'));
    this.externalCoSupervisors = (JSON.parse(stringCoSupervisors!=null?stringCoSupervisors:'[]'));
    this.professors = (JSON.parse(stringInternalCoSupervisors!=null?stringInternalCoSupervisors:'[]'));
    this.myForm = this.fb.group({
      title: ['', [Validators.required]],
      supervisor: this.professor,
      externalCoSupervisor: [''],
      internalCoSupervisor: [''],
      level: ['', [Validators.required]],
      thesisType: ['', [Validators.required]],
      groups: [this.professor.codGroup],
      description: ['', [Validators.required]],
      requirements: ['', [Validators.required]],
      notes: '',
      keywords: ['', [customKeywordValidator(this.keywordsList)]],
      abroad:false,
      CdS: ['', [customCdSValidator(this.selectedCdS)]],
      expirationDate: ['', [Validators.required]]
    });

  }

  async onSubmit() {
    if (this.myForm.valid) {
      this.myForm.get('keywords')?.value!=''?this.keywordsList.push(this.myForm.get('keywords')?.value):''
      let submitform = {
        title: this.myForm.get('title')?.value,
        keywords: this.keywordsList,
        abroad: this.myForm.get('abroad')?.value,
        thesisType: this.myForm.get('thesisType')?.value,
        description: this.myForm.get('description')?.value,
        expirationDate: this.myForm.get('expirationDate')?.value,
        level: this.myForm.get('level')?.value,
        requirements: this.myForm.get('requirements')?.value,
        CdS: this.selectedCdS.map((element)=>{
          return {
            degreeId: element.degreeId
          };

        }),
        coSupervisor: this.selectedCoSupervisors.map((element)=>{
          return {
            coSupervisorId: element.externalCoSupervisorId
          }

        }).concat(this.selectedProfessors.map((element)=>{
          return {
            coSupervisorId: element.professorId
          }

        })),
        notes: this.myForm.get('notes')?.value!=undefined?'none':this.myForm.get('notes')?.value
      }
      console.log(submitform);
      const response = await this.api.updateThesis(this.thesisProposal.thesisProposalId ,submitform)
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
      this.myForm.get('keywords')?.setValue(keyword)
    }
  }

  onSelectCoSupervisorChange(event: any) {
    console.log(event.target.value)
    let cosupervisor = this.externalCoSupervisors.find(elemento => elemento.externalCoSupervisorId==event.target.value)
    this.externalCoSupervisors = this.externalCoSupervisors.filter(elemento => elemento.externalCoSupervisorId!=event.target.value)
    this.selectedCoSupervisors.push(cosupervisor?cosupervisor:{
      externalCoSupervisorId: '',
      name:'',
      surname:'',
      self:'',
    })
    this.myForm.get('externalCoSupervisor')?.setValue( '')
  }
  removeCoSupervisor(event: any){
    const valoreDiv = event.target.textContent;
    let cosupervisor = this.selectedCoSupervisors.find(elemento => elemento.name==valoreDiv.split(' ')[0] && elemento.surname==valoreDiv.split(' ')[1])
    this.selectedCoSupervisors = this.selectedCoSupervisors.filter(elemento => elemento.externalCoSupervisorId!=cosupervisor?.externalCoSupervisorId)
    this.externalCoSupervisors.push(cosupervisor?cosupervisor:{
      externalCoSupervisorId: '',
      name:'',
      surname:'',
      self:'',
    })
  }
  onSelectProfessorChange(event: any) {
    console.log(event.target.value)
    let cosupervisor = this.professors.find(elemento => elemento.professorId==event.target.value)
    this.professors = this.professors.filter(elemento => elemento.professorId!=event.target.value)
    this.selectedProfessors.push(cosupervisor?cosupervisor:{
      professorId: '',
      name:'',
      surname:'',
      self:'',
    })
    this.myForm.get('internalCoSupervisor')?.setValue( '')
  }
  removeProfessor(event: any){
    const valoreDiv = event.target.textContent;
    let cosupervisor = this.selectedProfessors.find(elemento => elemento.name==valoreDiv.split(' ')[0] && elemento.surname==valoreDiv.split(' ')[1])
    this.selectedProfessors = this.selectedProfessors.filter(elemento => elemento.professorId!=cosupervisor?.professorId)
    this.professors.push(cosupervisor?cosupervisor:{
      professorId: '',
      name:'',
      surname:'',
      self:'',
    })
  }
  onSelectCdSChange(event: any) {
    const originalProfessors = [...this.degrees];
    let cds = this.degrees.find(elemento => elemento.degreeId==event.target.value)
    this.degrees = [];
    this.degrees = originalProfessors.filter(elemento => elemento.degreeId!=event.target.value)
    this.selectedCdS.push(cds?cds:{
      titleDegree: '',
      degreeId:'',
    })
    this.myForm.get('CdS')?.setValue( '')
  }

  removeCdS(event: any) {
    const valoreDiv = event.target.textContent;
    let cds = this.selectedCdS.find(elemento => elemento.degreeId==valoreDiv.split(' ')[0])
    this.selectedCdS = this.selectedCdS.filter(elemento => elemento.degreeId!=cds?.degreeId)
    this.degrees.push(cds?cds:{
      titleDegree: '',
      degreeId:'',
    })
    console.log(this.selectedCdS)

    this.myForm.get('CdS')?.setValue( '')
    this.updateCdSValidator();
  }

}
