import {Component, EventEmitter, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

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

  @Output()
  requestAccepted= new EventEmitter<boolean>();
  @Output()
  response= new EventEmitter<{}>();

  constructor(private fb: FormBuilder) {
      this.myForm = this.fb.group({
          title: ['', [Validators.required]],
          supervisor: ['', [Validators.required]],
          coSupervisor: [''],
          level: ['', [Validators.required]],
          type: ['', [Validators.required]],
          groups: [''],
          description: ['', [Validators.required]],
          requiredKnowledge: ['', [Validators.required]],
          notes: [''],
          keywords: [''],
          courseType: ['', [Validators.required]],
          expirationDate: ['', [Validators.required]]
      });
  }

    onSubmit() {
        if (this.myForm.valid) {
            // Handle form submission
            this.requestAccepted.emit(true);
            this.response.emit({});
            console.log(this.myForm.value);
        }
    }

    onSelectFocus() {
        this.selectFocus = true;
    }

    onSelectBlur() {
        this.selectFocus=false
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
