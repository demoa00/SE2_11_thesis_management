import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { ProposalsViewComponent } from './proposals-view.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ButtonComponent } from 'src/app/shared/components/button/button.component';
import { MatIconModule } from '@angular/material/icon';
import { DropdownCheckboxComponent } from '../../dropdown-checkbox/dropdown-checkbox.component';
import { FiltersContainerComponent } from '../../filters-container/filters-container.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { APIService } from 'src/app/shared/services/api.service';

describe('ProposalsComponent', () => {
  let component: ProposalsViewComponent;
  let fixture: ComponentFixture<ProposalsViewComponent>;
  let apiService: jasmine.SpyObj<APIService>;

  beforeEach(async () => {
    apiService = jasmine.createSpyObj('APIService', {
      'getAllProposals': Promise.resolve([]),
      'getSupervisors': Promise.resolve([]),
      'getApplications': Promise.resolve([]),
      'getProposal': Promise.resolve([]),
      'getExternalCoSupervisors': Promise.resolve([]),
      'getCoSupervisors': Promise.resolve([]),
    });
    
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, MatIconModule, MatDatepickerModule, MatNativeDateModule, FormsModule, BrowserAnimationsModule],
      declarations: [ProposalsViewComponent, ButtonComponent, DropdownCheckboxComponent, FiltersContainerComponent],
      providers: [{ provide: APIService, useValue: apiService }]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProposalsViewComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update searchValue', () => {
    const inputValue = 'testValue';
  
    component.updateSearchValue(inputValue);
  
    expect(component.searchValue).toEqual(inputValue.trim().toLowerCase());
  });

  it('should set proposalParams.text to null and call api.getAllProposals with null when searchValue is empty', async () => {
    component.searchValue = '';
    component.search();
  
    expect(component.proposalParams.text).toBeNull();
    expect(apiService.getAllProposals).toHaveBeenCalledWith(null);
  });

  it('should toggle professor selection', async () => {
    const prof1 = { id: 1, name: 'Professor 1' };
    const prof2 = { id: 2, name: 'Professor 2' };
    
    component.toggleProf(prof1);

    expect(component.selectedProfs).toContain(prof1, 'Professor 1 should be selected');
    expect(component.proposalParams.supervisors).toEqual([prof1], 'Proposal params should contain Professor 1');

    component.toggleProf(prof1);

    expect(component.selectedProfs).not.toContain(prof1, 'Professor 1 should be deselected');
    expect(component.proposalParams.supervisors).toBeNull('Proposal params should be null after deselecting');

    component.toggleProf(prof2);

    expect(component.selectedProfs).toContain(prof2, 'Professor 2 should be selected');
    expect(component.proposalParams.supervisors).toEqual([prof2], 'Proposal params should contain Professor 2');

    component.toggleProf(prof2);

    expect(component.selectedProfs.length).toBe(0, 'No professors should be selected');
    expect(component.proposalParams.supervisors).toBeNull('Proposal params should be null after deselecting all');
  });

  it('should handle error on toggleProf', () => {
    const mockError = 'Test Error';
    const prof1 = { id: 1, name: 'Professor 1' };

    apiService.getAllProposals.and.returnValue(Promise.reject(mockError));

    let ret = component.toggleProf(prof1);

    expect(ret).toBeUndefined();
  });

  it('should return true when professor is selected', () => {
    const selectedProf = {};
    component.toggleProf(selectedProf);
    const result = component.isProfSelected(selectedProf);
    expect(result).toBe(true);
  });

  it('should reset filters and fetch all proposals when deleteFilters() is called', async () => {
    component.proposals = [];
    component.selectedProfs = [];
    component.searchValue = 'test search';
    
    apiService.getAllProposals.and.returnValue(Promise.resolve([]));
  
    component.deleteFilters();
  
    expect(apiService.getAllProposals).toHaveBeenCalledWith(null);
  
    expect(component.proposals).toEqual([]);
    expect(component.selectedProfs).toEqual([]);
    expect(component.searchValue).toEqual('');
  });

  it('should handle error on deleteFilters', () => {
    const mockError = 'Test Error';

    apiService.getAllProposals.and.returnValue(Promise.reject(mockError));

    let ret = component.deleteFilters();

    expect(ret).toBeUndefined();
  });

  it('should toggle filters when showFilters is false', fakeAsync(() => {
    component.showFilters = false;

    component.toggleMoreFilters();
    tick();
    fixture.detectChanges();

    expect(component.showFilters).toBe(true);
  }));

  it('should clear filters when showFilters is true', fakeAsync(() => {
    component.showFilters = true;
    component.proposalParams.cosupervisors = [{ name: 'Professor A' }];
    component.proposalParams.extCs = [{ name: 'External C' }];
    component.proposalParams.expirationDate = '2024-01-31';

    component.toggleMoreFilters();
    tick();
    fixture.detectChanges();

    expect(component.showFilters).toBe(false);
    expect(component.proposalParams.cosupervisors).toBeNull();
    expect(component.proposalParams.extCs).toBeNull();
    expect(component.proposalParams.expirationDate).toBeNull();
  }));

  it('should emit selected proposal and canApply as true when proposal is found', fakeAsync(() => {
    const proposalId = 1;
    const mockProposal = {};
    apiService.getProposal.and.resolveTo(mockProposal);
  
    const emitSpy = spyOn(component.selectedProposal, 'emit');
    const canApplyEmitSpy = spyOn(component.canApply, 'emit');
  
    component.selectProposal(proposalId);
    tick();
  
    expect(apiService.getProposal).toHaveBeenCalledWith(proposalId);
    expect(emitSpy).toHaveBeenCalledWith(mockProposal);
    expect(canApplyEmitSpy).toHaveBeenCalledWith(true);
  }));
});
