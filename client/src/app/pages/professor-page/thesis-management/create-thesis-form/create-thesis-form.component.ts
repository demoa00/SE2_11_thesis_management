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

  constructor(private fb: FormBuilder, private api: APIService) {
    let stringProfessor= localStorage.getItem('professor')
    let stringDegree = localStorage.getItem('degrees')
    this.degrees = (JSON.parse(stringDegree!=null?stringDegree:''))
    this.professor = (JSON.parse(stringProfessor!=null?stringProfessor:''))
    console.log(this.professor)
    console.log(this.degrees)
      this.myForm = this.fb.group({
          title: ['', [Validators.required]],
          supervisor: this.professor,
          coSupervisor: [''],
          level: ['', [Validators.required]],
          thesisType: ['', [Validators.required]],
          groups: [(JSON.parse(stringProfessor!=null?stringProfessor:'')).codGroup],
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
            keywordsControl?.setValue(''); // Resetta il campo delle keywords
        }
    }

    removeKeyword(keyword: string) {
        const index = this.keywordsList.indexOf(keyword);
        if (index !== -1) {
            this.keywordsList.splice(index, 1);
        }
    }
}
