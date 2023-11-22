import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { CreateThesisFormComponent } from './create-thesis-form.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('CreateThesisFormComponent', () => {
  let component: CreateThesisFormComponent;
  let fixture: ComponentFixture<CreateThesisFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [CreateThesisFormComponent]
    });
    fixture = TestBed.createComponent(CreateThesisFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit events on form submission', () => {
    spyOn(component.requestAccepted, 'emit');
    spyOn(component.response, 'emit');

    component.myForm.setValue({
      title: 'Valid Title',
      supervisor: 'Valid Supervisor',
      coSupervisor: 'Valid CoSupervisor',
      level: 'Valid Level',
      type: 'Valid Type',
      groups: 'Valid Groups',
      description: 'Valid Description',
      requiredKnowledge: 'Valid Knowledge',
      notes: 'Valid Notes',
      keywords: 'Valid Keywords',
      courseType: 'Valid CourseType',
      expirationDate: 'Valid ExpirationDate'
    });

    component.onSubmit();

    expect(component.requestAccepted.emit).toHaveBeenCalledWith(true);
    expect(component.response.emit).toHaveBeenCalledWith({});
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

    component.removeKeyword('Keyword2');

    expect(component.keywordsList).toEqual(['Keyword1', 'Keyword3']);
  });
});
