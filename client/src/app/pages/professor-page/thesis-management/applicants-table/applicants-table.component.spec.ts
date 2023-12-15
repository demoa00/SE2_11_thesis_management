import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { ApplicantsTableComponent } from './applicants-table.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { APIService } from 'src/app/shared/services/api.service';
import { IconComponent } from 'src/app/shared/components/icon/icon.component';

describe('ApplicantsTableComponent', () => {
  let component: ApplicantsTableComponent;
  let fixture: ComponentFixture<ApplicantsTableComponent>;
  let apiServiceSpy: jasmine.SpyObj<APIService>;

  beforeEach(async () => {
    apiServiceSpy = jasmine.createSpyObj('APIService', {
      'putApplication': Promise.resolve([]),
      'getApplications': Promise.resolve([])
    });

    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ApplicantsTableComponent, IconComponent],
      providers: [{ provide: APIService, useValue: apiServiceSpy }]
    }).compileComponents();

    fixture = TestBed.createComponent(ApplicantsTableComponent);
    component = fixture.componentInstance;

    await fixture.whenStable();

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update filteredRows and set openFilter to false in ngOnChanges', () => {
    const mockRows = [{}];
    const initialFilteredRows = component.filteredRows;
    const initialOpenFilter = component.openFilter;
  
    component.rows = mockRows;
    component.ngOnChanges({ rows: { currentValue: mockRows, previousValue: undefined, isFirstChange: () => true, firstChange: true } });
  
    expect(component.filteredRows).toEqual(mockRows);
    expect(component.openFilter).toBe(false);
    expect(component.studentFilter).toBe('');
    expect(component.titleFilter).toBe('');
  });

  it('should open accept popup and reset state', () => {
    const mockApplicant = { studentId: '123', thesisProposalId: '456' };
    component.acceptPopup = false;
    component.requestAccepted = true;
    component.response = { someData: 'test data' };

    component.openAcceptPopup(mockApplicant);

    expect(component.acceptPopup).toBe(true);
    expect(component.requestAccepted).toBe(false);
    expect(component.response).toBeUndefined();
    expect(component.applicant).toEqual(mockApplicant);
  });

  it('should open reject popup and reset state', () => {
    const mockApplicant = { studentId: '123', thesisProposalId: '456' };
    component.rejectPopup = false;
    component.requestAccepted = false;
    component.response = { someData: 'test data' };

    component.openRejectPopup(mockApplicant);

    expect(component.rejectPopup).toBe(true);
    expect(component.requestAccepted).toBe(false);
    expect(component.response).toBeUndefined();
    expect(component.applicant).toEqual(mockApplicant);
  });

  it('should reset applicant in rejectApplication', fakeAsync(() => {
    const mockApplicant = { studentId: '123', thesisProposalId: '456' };
    component.applicant = mockApplicant;

    apiServiceSpy.putApplication.and.returnValue(Promise.resolve({}));

    component.rejectApplication();
    fixture.detectChanges();
    tick();

    expect(apiServiceSpy.putApplication).toHaveBeenCalledWith(mockApplicant.studentId, mockApplicant.thesisProposalId, 'Rejected');
    expect(component.requestAccepted).toBe(true);
    expect(component.applicant).toBeUndefined();
  }));

  it('should reset applicant in acceptApplication', fakeAsync(() => {
    const mockApplicant = { studentId: '123', thesisProposalId: '456' };
    component.applicant = mockApplicant;

    apiServiceSpy.putApplication.and.returnValue(Promise.resolve({}));

    component.acceptApplication();
    fixture.detectChanges();
    tick();

    expect(apiServiceSpy.putApplication).toHaveBeenCalledWith(mockApplicant.studentId, mockApplicant.thesisProposalId, 'Accepted');
    expect(component.requestAccepted).toBe(true);
    expect(component.applicant).toBeUndefined();
  }));

  it('should filter rows based on applied filters', () => {
    const mockRows = [
      { studentId: '1', thesisProposalTitle: 'Title1', date: '2023-01-01', status: 'Accepted' },
      { studentId: '2', thesisProposalTitle: 'Title2', date: '2023-01-02', status: 'Rejected' },
    ];
  
    component.rows = mockRows;
    component.filteredRows = mockRows;
  
    component.studentFilter = '1';
    component.titleFilter = 'Title1';
    component.dateFilter = '2023-01-01';
    component.statusFilter = 'Accepted';
  
    component.applyFilters();
  
    expect(component.filteredRows.length).toBe(1); // Only one row should match the applied filters
    expect(component.filteredRows[0].studentId).toBe('1'); // The filtered row should have studentId '1'
  });

  it('should reset filters and update filteredRows', () => {
    component.openFilter = true;
    component.rows = [
      { studentId: '1', thesisProposalTitle: 'Title 1', date: '2023-01-01', status: 'Accepted' },
      { studentId: '2', thesisProposalTitle: 'Title 2', date: '2023-01-02', status: 'Rejected' },
    ];

    component.resetFilter();
  
    expect(component.filteredRows).toEqual(component.rows);
    expect(component.openFilter).toBe(false);
  });
});
