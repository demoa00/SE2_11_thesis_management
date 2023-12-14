import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateThesisFormComponent } from './create-thesis-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { APIService } from 'src/app/shared/services/api.service';

describe('CreateThesisFormComponent', () => {
  let component: CreateThesisFormComponent;
  let fixture: ComponentFixture<CreateThesisFormComponent>;
  let apiServiceSpy: jasmine.SpyObj<APIService>;

  beforeEach(() => {
    apiServiceSpy = jasmine.createSpyObj('APIService', ['insertNewThesis']);

    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, HttpClientTestingModule],
      declarations: [CreateThesisFormComponent],
      providers: [{ provide: APIService, useValue: apiServiceSpy }]
    });
    fixture = TestBed.createComponent(CreateThesisFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form when thesisProposal is defined', () => {
    const mockThesisProposal = {
      title: 'Test Thesis',
      level: 'Test Level',
      thesisType: 'Test Type',
      description: 'Test Description',
      requirements: 'Test Requirements',
      expirationDate: '2023-12-31',
      abroad: false,
      keywords: ['Keyword1', 'Keyword2'],
      CdS: [{ titleDegree: 'Degree1', degreeId: '1' }],
      coSupervisor: [
        { coSupervisorId: 'e123', name: 'External CoSupervisor', surname: 'External Surname', self: 'Some info' },
        { coSupervisorId: 'p456', name: 'Internal CoSupervisor', surname: 'Internal Surname', self: 'Some info' }
      ],
      notes: 'Test Notes',
    };

    component.thesisProposal = mockThesisProposal;

    const updateCdSValidatorSpy = spyOn(component, 'updateCdSValidator');
    const updateKeywordValidatorSpy = spyOn(component, 'updateKeywordValidator');
    spyOn(console, 'log');

    component.ngOnInit();

    expect(component.myForm.get('title')?.value).toBe(mockThesisProposal.title);
    expect(component.myForm.get('level')?.value).toBe(mockThesisProposal.level);

    expect(component.keywordsList).toEqual(mockThesisProposal.keywords);
    expect(component.selectedCdS).toEqual(mockThesisProposal.CdS);

    expect(updateCdSValidatorSpy).toHaveBeenCalled();
    expect(updateKeywordValidatorSpy).toHaveBeenCalled();
    expect(console.log).toHaveBeenCalledWith(mockThesisProposal);
  });

  it('should handle valid stringDegrees', () => {
    const degreesData = '[{"titleDegree": "Degree 1", "degreeId": 1}]';
    localStorage.setItem('degrees', degreesData);
    component.degrees = JSON.parse(degreesData);
    expect(component.degrees).toEqual(JSON.parse(degreesData));
  });

  it('should handle valid stringProfessor', () => {
    const professorData = '[{"codDepartment": "123", "codGroup": "456", "email": "professor@example.it", "professorId": "789", "self": "y", "name": "Allen", "surname": "Iverson"}]';
    localStorage.setItem('professor', professorData);
    component.professor = JSON.parse(professorData);
    expect(component.professor).toEqual(JSON.parse(professorData));
  });

  it('should handle valid stringCoSupervisors', () => {
    const coSupervisorsData = '[{"externalCoSupervisorId": "123", "name": "Allen", "surname": "Iverson", "self": "y"}]';
    localStorage.setItem('externalCoSupervisors', coSupervisorsData);
    component.externalCoSupervisors = JSON.parse(coSupervisorsData);
    expect(component.externalCoSupervisors).toEqual(JSON.parse(coSupervisorsData));
  });

  it('should return supervisor name on getSupervisorName', () => {
    component.myForm.get('supervisor')?.setValue({ name: 'John', surname: 'Doe' });
    const result = component.supervisorName;
    expect(result).toBe('John');
  });

  it('should handle onSelectCoSupervisorChange', () => {
    const coSupervisorId = 123;
    const coSupervisorData = {
      externalCoSupervisorId: coSupervisorId,
      name: 'Test',
      surname: 'CoSupervisor',
      self: 'Some info',
    };

    component.externalCoSupervisors = [coSupervisorData];
    component.selectedCoSupervisors = [];

    spyOn(component, 'onSelectCoSupervisorChange').and.callThrough();

    const event = { target: { value: coSupervisorId } };
    component.onSelectCoSupervisorChange(event);

    expect(component.onSelectCoSupervisorChange).toHaveBeenCalledWith(event);
    expect(component.selectedCoSupervisors).toEqual([coSupervisorData]);
    expect(component.externalCoSupervisors).toEqual([]);
  });

  it('should handle removeCoSupervisor', () => {
    const coSupervisorData = {
      externalCoSupervisorId: 123,
      name: 'Test',
      surname: 'CoSupervisor',
      self: 'Some info',
    };

    component.selectedCoSupervisors = [coSupervisorData];
    component.externalCoSupervisors = [];

    spyOn(component, 'removeCoSupervisor').and.callThrough();

    const mockEvent = { target: { textContent: 'Test CoSupervisor' } };
    component.removeCoSupervisor(mockEvent);

    expect(component.removeCoSupervisor).toHaveBeenCalledWith(mockEvent);
    expect(component.selectedCoSupervisors).toEqual([]);
    expect(component.externalCoSupervisors).toEqual([coSupervisorData]);
  });

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

  it('should update CdS validator', () => {
    const mockAbstractControl = jasmine.createSpyObj('AbstractControl', ['setValidators', 'updateValueAndValidity']);

    spyOn(component.myForm, 'get').and.returnValue(mockAbstractControl);

    component.updateCdSValidator();

    expect(mockAbstractControl.setValidators).toHaveBeenCalled();
    expect(mockAbstractControl.updateValueAndValidity).toHaveBeenCalled();
  });

  it('should update CdS validator', () => {
    const mockAbstractControl = jasmine.createSpyObj('AbstractControl', ['setValidators', 'updateValueAndValidity']);

    spyOn(component.myForm, 'get').and.returnValue(mockAbstractControl);

    component.updateKeywordValidator();

    expect(mockAbstractControl.setValidators).toHaveBeenCalled();
    expect(mockAbstractControl.updateValueAndValidity).toHaveBeenCalled();
  });
});
