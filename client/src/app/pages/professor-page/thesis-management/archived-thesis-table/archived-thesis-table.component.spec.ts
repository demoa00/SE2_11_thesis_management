import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { ArchivedThesisTableComponent } from './archived-thesis-table.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { APIService } from 'src/app/shared/services/api.service';

describe('ArchivedThesisTableComponent', () => {
  let component: ArchivedThesisTableComponent;
  let fixture: ComponentFixture<ArchivedThesisTableComponent>;
  let apiService: jasmine.SpyObj<APIService>;

  beforeEach(async () => {
    apiService = jasmine.createSpyObj('APIService', {
      'getProposal': Promise.resolve([]),
      'deleteThesis': Promise.resolve([])
    })

    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ArchivedThesisTableComponent],
      providers: [{ provide: APIService, useValue: apiService }]
    }).compileComponents();
    
    fixture = TestBed.createComponent(ArchivedThesisTableComponent);
    component = fixture.componentInstance;

    await fixture.whenStable();

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch proposal details on shohDetails', fakeAsync(() => {
    const mockRow = { thesisProposalId: 123 };
    const mockResponse = {};

    apiService.getProposal.and.returnValue(Promise.resolve(mockResponse));

    component.shohDetails(mockRow);
    tick();

    expect(apiService.getProposal).toHaveBeenCalledWith(mockRow.thesisProposalId);
    expect(component.selectedProposal).toEqual(mockResponse);
  }));

  // it('should toggle deletePopup and reset state on deleteThesisPopup', () => {
  //   component.deletePopup = false;
  //   component.requestAccepted = true;
  //   component.response = { someData: 'test data' };

  //   component.deleteThesisPopup();

  //   expect(component.deletePopup).toBe(true);
  //   expect(component.requestAccepted).toBe(false);
  //   expect(component.response).toBeUndefined();
  // });

  // it('should call deleteThesis and set requestAccepted to true', fakeAsync(() => {
  //   const mockReponse = {};

  //   apiService.deleteThesis.and.returnValue(Promise.resolve(mockReponse));

  //   component.selectedThesisId = 123;
  //   component.deleteThesis();
  //   tick();

  //   expect(apiService.deleteThesis).toHaveBeenCalledWith(component.selectedThesisId);
  //   expect(component.response).toEqual(mockReponse);
  //   expect(component.requestAccepted).toBeTruthy();
  // }));
});
