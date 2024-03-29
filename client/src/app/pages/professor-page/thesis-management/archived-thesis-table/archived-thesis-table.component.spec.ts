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

  it('should toggle createPopup and reset state on openCreatePopup', () => {
    component.createPopup = false;
    component.requestAccepted = true;
    component.response = { someData: 'test data' };
  
    component.openCreatePopup();
  
    expect(component.createPopup).toBe(true);
    expect(component.requestAccepted).toBe(false);
    expect(component.response).toBeUndefined();
  });
});
