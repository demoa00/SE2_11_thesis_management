import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { ThesisRequestsTableComponent } from './thesis-requests-table.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { APIService } from 'src/app/shared/services/api.service';

describe('ThesisRequestsTableComponent', () => {
  let component: ThesisRequestsTableComponent;
  let fixture: ComponentFixture<ThesisRequestsTableComponent>;
  let apiService: jasmine.SpyObj<APIService>;

  beforeEach(async () => {
    apiService = jasmine.createSpyObj('APIService', {
      'getProposal': Promise.resolve([]),
    });

    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ThesisRequestsTableComponent],
      providers: [{ provide: APIService, useValue: apiService }]
    }).compileComponents();
    
    fixture = TestBed.createComponent(ThesisRequestsTableComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getProposal on shohDetails', async () => {
    const row = { thesisProposalId: 'someProposalId' };
    const response = {};
    apiService.getProposal.and.returnValue(Promise.resolve(response));

    await component.shohDetails(row);

    expect(apiService.getProposal).toHaveBeenCalledWith('someProposalId' as any);
    expect(component.selectedProposal).toEqual(response);
  });

  it('should open create popup', fakeAsync(() => {
    expect(component.createPopup).toBeFalsy();
    expect(component.requestAccepted).toBeFalsy();

    component.openCreatePopup();
    tick();

    expect(component.createPopup).toBeTruthy();
    expect(component.requestAccepted).toBeFalsy();
    expect(component.response).toBeUndefined();
  }));
});
