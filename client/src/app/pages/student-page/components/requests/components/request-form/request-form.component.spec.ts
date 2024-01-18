import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestFormComponent } from './request-form.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ButtonComponent } from 'src/app/shared/components/button/button.component';
import { FormsModule } from '@angular/forms';
import { APIService } from 'src/app/shared/services/api.service';
import { DropdownCheckboxComponent } from '../../../dropdown-checkbox/dropdown-checkbox.component';

describe('RequestFormComponent', () => {
  let component: RequestFormComponent;
  let fixture: ComponentFixture<RequestFormComponent>;
  let apiService: jasmine.SpyObj<APIService>;

  beforeEach(async () => {
    apiService = jasmine.createSpyObj('APIService', {
      'getProfessors': Promise.resolve([]),
      'postThesisRequest': Promise.resolve([]),
      'getCoSupervisors': Promise.resolve([]),
      'putThesisRequestStudent': Promise.resolve([]),
    });

    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, FormsModule],
      declarations: [RequestFormComponent, ButtonComponent, DropdownCheckboxComponent],
      providers: [{ provide: APIService, useValue: apiService }]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequestFormComponent);
    component = fixture.componentInstance;

    await fixture.whenStable();

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should reset form fields and emit false to showPopup', () => {
    component.title = 'Sample Title';
    component.description = 'Sample Description';
    component.professorId = 'Sample Professor';

    spyOn(component.showPopup, 'emit');

    component.cancel();

    expect(component.title).toEqual('');
    expect(component.description).toEqual('');
    expect(component.professorId).toEqual('');
    expect(component.showPopup.emit).toHaveBeenCalledWith(false);
  });

  it('should submit and update when update is true', async () => {
    component.update = true;
    component.thesisRequestId = 'testThesisRequestId';
    component.title = 'Test Title';
    component.description = 'Test Description';
    component.professorId = 'Test Professor';
  
    apiService.putThesisRequestStudent.and.returnValue(Promise.resolve({}));
  
    spyOn(component.showAlert, 'emit');
    spyOn(component, 'cancel');
  
    await component.submit({ preventDefault: jasmine.createSpy('preventDefault') } as any);
  
    expect(apiService.putThesisRequestStudent).toHaveBeenCalled();
    expect(component.showAlert.emit).toHaveBeenCalledWith('success');
    expect(component.cancel).toHaveBeenCalled();
  });

  it('should submit and create when update is false', async () => {
    component.update = false;
    component.title = 'Test Title';
    component.description = 'Test Description';
    component.professorId = 'Test Professor';
  
    apiService.postThesisRequest.and.returnValue(Promise.resolve({}));
  
    spyOn(component.showAlert, 'emit');
    spyOn(component, 'cancel');
  
    await component.submit({ preventDefault: jasmine.createSpy('preventDefault') } as any);
  
    expect(apiService.postThesisRequest).toHaveBeenCalled();
    expect(component.showAlert.emit).toHaveBeenCalledWith('success');
    expect(component.cancel).toHaveBeenCalled();
  });

  it('should handle error on submit', async () => {
    const mockError = 'Test Error';
    component.update = true;

    apiService.putThesisRequestStudent.and.returnValue(Promise.reject(mockError));

    let res = await component.submit({ preventDefault: jasmine.createSpy('preventDefault') } as any);

    expect(res).toBeUndefined();

    component.update = false;

    apiService.postThesisRequest.and.returnValue(Promise.reject(mockError));

    res = await component.submit({ preventDefault: jasmine.createSpy('preventDefault') } as any);

    expect(res).toBeUndefined();
  });

  it('should return true when all fields are filled', () => {
    component.title = 'Test Title';
    component.description = 'Test Description';
    component.professorId = 'Test Professor';

    const result = component.checkFields();

    expect(result).toBe(true);
  });

  it('should handle error on ngOnInit', () => {
    const mockError = new Error('Test Error');

    apiService.getProfessors.and.returnValue(Promise.reject(mockError));

    const result = component.ngOnInit();

    expect(result).toBeUndefined();
  });

  it('should handle error on ngOnInit', () => {
    const mockError = new Error('Test Error');

    apiService.getCoSupervisors.and.returnValue(Promise.reject(mockError));

    const result = component.ngOnInit();

    expect(result).toBeUndefined();
  });

  it('should select a professor and update professorId', () => {
    const mockProfessor = { professorId: '1', name: 'John', surname: 'Doe' };
  
    component.toggleProf(mockProfessor);
  
    expect(component.selectedSupervisor).toEqual(mockProfessor);
    expect(component.professorId).toEqual(mockProfessor.professorId);
  });

  it('should add co-supervisor if not selected', () => {
    const mockProf = { professorId: '1' };
  
    component.toggleCoSupervisor(mockProf);
  
    expect(component.selectedCoSupervisors).toEqual([mockProf]);
  });

  it('should remove co-supervisor if already selected', () => {
    const mockProf = { professorId: '1' };
  
    component.selectedCoSupervisors = [mockProf];
  
    component.toggleCoSupervisor(mockProf);
  
    expect(component.selectedCoSupervisors).toEqual([]);
  });

  it('should return true when selectedSupervisor is defined and matches the provided professor', () => {
    const professor = { professorId: '123', name: 'John', surname: 'Doe' };

    component.selectedSupervisor = professor;

    const result = component.isProfSelected(professor);

    expect(result).toBe(true);
  });

  it('should return false when selectedSupervisor is undefined', () => {
    const professor = { professorId: '123', name: 'John', surname: 'Doe' };

    const result = component.isProfSelected(professor);

    expect(result).toBe(false);
  });

  it('should return true when prof is a selected co-supervisor', () => {
    const mockCoSupervisor = { professorId: '1', name: 'John', surname: 'Doe' };
    component.selectedCoSupervisors = [mockCoSupervisor];
  
    const result = component.isCoSupervisorSelected(mockCoSupervisor);
  
    expect(result).toBe(true);
  });

  it('should return the concatenated names and surnames of selected co-supervisors', () => {
    const coSupervisor1 = { name: 'John', surname: 'Doe' };
    const coSupervisor2 = { name: 'Jane', surname: 'Smith' };
  
    component.selectedCoSupervisors = [coSupervisor1, coSupervisor2];
  
    const result = component.selectedCoSupervisorsNames();
  
    expect(result).toEqual('John Doe, Jane Smith');
  });
});
