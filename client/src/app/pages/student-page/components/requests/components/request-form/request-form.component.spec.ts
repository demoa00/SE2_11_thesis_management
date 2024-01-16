import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestFormComponent } from './request-form.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ButtonComponent } from 'src/app/shared/components/button/button.component';
import { FormsModule } from '@angular/forms';
import { APIService } from 'src/app/shared/services/api.service';

describe('RequestFormComponent', () => {
  let component: RequestFormComponent;
  let fixture: ComponentFixture<RequestFormComponent>;
  let apiService: jasmine.SpyObj<APIService>;

  beforeEach(async () => {
    apiService = jasmine.createSpyObj('APIService', {
      'getProfessors': Promise.resolve([]),
      'postThesisRequest': Promise.resolve([]),
      'getCoSupervisors': Promise.resolve([]),
    });

    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, FormsModule],
      declarations: [RequestFormComponent, ButtonComponent],
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

  it('should handle form submission', () => {
    const mockSubmitEvent: SubmitEvent = {
      preventDefault: jasmine.createSpy('preventDefault'),
    } as any;

    component.submit(mockSubmitEvent);

    expect(mockSubmitEvent.preventDefault).toHaveBeenCalled();
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
});
