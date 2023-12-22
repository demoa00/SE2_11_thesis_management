import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateThesisFormComponent } from './update-thesis-form.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('UpdateThesisFormComponent', () => {
  let component: UpdateThesisFormComponent;
  let fixture: ComponentFixture<UpdateThesisFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, FormsModule, ReactiveFormsModule],
      declarations: [UpdateThesisFormComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(UpdateThesisFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update CdS validator', () => {
    const initialValidators = component.myForm.get('CdS')?.validator;

    component.selectedCdS = [{ titleDegree: 'Some Degree', degreeId: '123' }];
    component.updateCdSValidator();

    const updatedValidators = component.myForm.get('CdS')?.validator;

    expect(initialValidators).not.toEqual(updatedValidators);
  });

  it('should set selectFocus to true when calling onSelectFocus', () => {
    expect(component.selectFocus).toBeFalsy();

    component.onSelectFocus();

    expect(component.selectFocus).toBeTruthy();
  });

  it('should set selectFocus to false on blur', () => {
    component.selectFocus = true;

    component.onSelectBlur();

    expect(component.selectFocus).toBe(false);
  });

  it('should add a keyword to the keywords list', () => {
    const initialKeywordsList = component.keywordsList.slice();

    const keywordValue = 'NewKeyword';
    component.myForm.get('keywords')?.setValue(keywordValue);
    component.addKeyword(new Event('click'));

    expect(component.keywordsList).toEqual([...initialKeywordsList, keywordValue]);
  });

  it('should remove a keyword from keywordsList', () => {
    component.keywordsList = ['Keyword1', 'Keyword2', 'Keyword3'];

    const event = { target: { textContent: 'Keyword2' } };

    component.removeKeyword(event);

    expect(component.keywordsList).toEqual(['Keyword1', 'Keyword3']);
  });

  it('should add co-supervisor on select change', () => {
    const mockExternalCoSupervisors = [
      {
        externalCoSupervisorId: '1',
        name: 'John',
        surname: 'Doe',
        self: 'some value',
      },
    ];

    component.externalCoSupervisors = mockExternalCoSupervisors;

    const event = { target: { value: '1' } };
    component.onSelectCoSupervisorChange(event);

    expect(component.selectedCoSupervisors.length).toBe(1);
    expect(component.externalCoSupervisors.length).toBe(mockExternalCoSupervisors.length - 1);
  });

  it('should handle non-existing co-supervisor on select change', () => {
    const mockExternalCoSupervisors = [
      {
        externalCoSupervisorId: '1',
        name: 'John',
        surname: 'Doe',
        self: 'some value',
      },
    ];

    component.externalCoSupervisors = mockExternalCoSupervisors;

    const event = { target: { value: 'non-existent-id' } };
    component.onSelectCoSupervisorChange(event);

    expect(component.selectedCoSupervisors.length).toBe(1);
    expect(component.externalCoSupervisors.length).toBe(mockExternalCoSupervisors.length);
  });

  it('should remove a co-supervisor', () => {
    const coSupervisorToRemove = {
      externalCoSupervisorId: '123',
      name: 'John',
      surname: 'Doe',
      self: 'example.com/johndoe',
    };

    component.selectedCoSupervisors = [coSupervisorToRemove];

    component.externalCoSupervisors = [];

    component.removeCoSupervisor({ target: { textContent: 'John Doe' } });

    expect(component.selectedCoSupervisors.length).toBe(0);

    expect(component.externalCoSupervisors.length).toBe(1);
    expect(component.externalCoSupervisors[0]).toEqual(coSupervisorToRemove);
  });

  it('should initialize component properties on ngOnInit', () => {
    const mockThesisProposal = {
      title: 'Mock Thesis',
      level: 'Master',
      thesisType: 'Research',
      description: 'Mock description',
      requirements: 'Mock requirements',
      expirationDate: '2023-12-31',
      abroad: true,
      CdS: [
        { titleDegree: 'Computer Science', degreeId: 'CS123' },
        { titleDegree: 'Physics', degreeId: 'PHY456' },
      ],
      coSupervisor: [
        { coSupervisorId: 'e123', name: 'External', surname: 'CoSupervisor', self: 'example.com/external' },
        { coSupervisorId: 'p456', name: 'Internal', surname: 'CoSupervisor', self: 'example.com/internal' },
      ],
      notes: 'Mock notes',
      keywords: ['Keyword1', 'Keyword2'],
    };

    const mockExternalCoSupervisors = [ { 
      externalCoSupervisorId: 'e123', 
      name: 'External', 
      surname: 'CoSupervisor', 
      self: 'example.com/external' 
    } ];
    const mockProfessors = [ { 
      professorId: 'p456', 
      name: 'Internal', 
      surname: 'CoSupervisor', 
      self: 'example.com/internal' 
    } ];

    component.thesisProposal = mockThesisProposal;
    component.externalCoSupervisors = mockExternalCoSupervisors;
    component.professors = mockProfessors;

    component.ngOnInit();

    expect(component.keywordsList).toEqual(mockThesisProposal.keywords);
    expect(component.selectedCdS).toEqual(mockThesisProposal.CdS);
    expect(component.selectedCoSupervisors).toEqual([
      { externalCoSupervisorId: 'e123', name: 'External', surname: 'CoSupervisor', self: 'example.com/external' }
    ]);
    expect(component.selectedProfessors).toEqual([
      { professorId: 'p456', name: 'Internal', surname: 'CoSupervisor', self: 'example.com/internal' }
    ]);
    expect(component.myForm.get('title')?.value).toEqual(mockThesisProposal.title);
    expect(component.myForm.get('level')?.value).toEqual(mockThesisProposal.level);
    expect(component.myForm.get('thesisType')?.value).toEqual(mockThesisProposal.thesisType);
  });
});
