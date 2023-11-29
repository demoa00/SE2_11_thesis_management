import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { CreateThesisFormComponent } from './create-thesis-form.component';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { APIService } from 'src/app/shared/services/api.service';
import { of } from 'rxjs';

describe('CreateThesisFormComponent', () => {
  let component: CreateThesisFormComponent;
  let fixture: ComponentFixture<CreateThesisFormComponent>;
  let apiServiceSpy: jasmine.SpyObj<APIService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('APIService', ['insertNewThesis']);

    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [CreateThesisFormComponent],
      providers: [{ provide: APIService, useValue: spy }]
    });

    fixture = TestBed.createComponent(CreateThesisFormComponent);
    component = fixture.componentInstance;
    apiServiceSpy = TestBed.inject(APIService) as jasmine.SpyObj<APIService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should submit the form and emit events', fakeAsync(() => {
    const validFormValue = {
      title: 'Valid Title',
      supervisor: 'Valid Supervisor',
      coSupervisor: 'Valid CoSupervisor',
      level: 'Valid Level',
      thesisType: 'Valid ThesisType',
      groups: 'Valid Groups',
      description: 'Valid Description',
      requirements: 'Valid Requirements',
      notes: 'Valid Notes',
      keywords: 'Valid Keywords',
      CdS: 'Valid CdS',
      expirationDate: 'Valid ExpirationDate'
    };

    component.myForm.setValue(validFormValue);

    apiServiceSpy.insertNewThesis.and.returnValue(Promise.resolve({}));

    const requestAcceptedEmitSpy = spyOn(component.requestAccepted, 'emit');
    const responseEmitSpy = spyOn(component.response, 'emit');

    component.onSubmit();

    tick();

    expect(apiServiceSpy.insertNewThesis).toHaveBeenCalledWith(jasmine.objectContaining(validFormValue));

    expect(requestAcceptedEmitSpy).toHaveBeenCalledWith(true);
    expect(responseEmitSpy).toHaveBeenCalledWith({});
  }));

  it('should set and reset selectFocus correctly', () => {
    expect(component.selectFocus).toBe(false);

    component.onSelectFocus();
    expect(component.selectFocus).toBe(true);

    component.onSelectBlur();
    expect(component.selectFocus).toBe(false);
  });

  it('should add keyword to keywordsList and reset keywords form control', () => {
    const initialKeywordsList = [...component.keywordsList];
    const keywordsControl = component.myForm.get('keywords');
    keywordsControl?.setValue('New Keyword');

    component.addKeyword(new Event('click'));

    expect(component.keywordsList).toEqual([...initialKeywordsList, 'New Keyword']);

    expect(keywordsControl?.value).toBe('');
  });

  it('should remove keyword from keywordsList', () => {
    component.keywordsList = ['Keyword1', 'Keyword2', 'Keyword3'];

    const fakeEvent = { target: { textContent: 'Keyword2' } };
    component.removeKeyword(fakeEvent);

    expect(component.keywordsList).toEqual(['Keyword1', 'Keyword3']);
  });
});
