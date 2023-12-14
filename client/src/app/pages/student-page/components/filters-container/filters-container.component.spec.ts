import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { FiltersContainerComponent } from './filters-container.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ButtonComponent } from 'src/app/shared/components/button/button.component';
import { DropdownCheckboxComponent } from '../dropdown-checkbox/dropdown-checkbox.component';
import { MatDatepickerInputEvent, MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { APIService } from 'src/app/shared/services/api.service';
import { FormControl } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('FiltersContainerComponent', () => {
  let component: FiltersContainerComponent;
  let fixture: ComponentFixture<FiltersContainerComponent>;
  let apiService: jasmine.SpyObj<APIService>;

  beforeEach(async () => {
    apiService = jasmine.createSpyObj('APIService', {
      'getAllProposals': Promise.resolve([]),
      'getExternalCoSupervisors': Promise.resolve([]),
      'getCoSupervisors': Promise.resolve([])
    });

    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, MatDatepickerModule, MatNativeDateModule, MatIconModule, NoopAnimationsModule],
      declarations: [FiltersContainerComponent, ButtonComponent, DropdownCheckboxComponent],
      providers: [{ provide: APIService, useValue: apiService }]
    }).compileComponents();

    fixture = TestBed.createComponent(FiltersContainerComponent);
    component = fixture.componentInstance;

    await fixture.whenStable();

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should reset selectedCs and selectedExtCs when cosupervisors are null', () => {
    component.params = { cosupervisors: [{ professorId: 1, name: 'John Doe' }] };
    component.selectedCs = [{ professorId: 1, name: 'John Doe' }];
    component.selectedExtCs = [{ externalCoSupervisorId: 2, name: 'Jane Smith' }];

    component.ngOnChanges({ params: { currentValue: { cosupervisors: null } }, selectedDate: null });

    expect(component.selectedCs.length).toEqual(0);
    expect(component.selectedExtCs.length).toEqual(0);
    expect(component.selectedDate).toBe(null);
  });

  it('should return true if cs is in selectedCs', () => {
    component.selectedCs = [
      { professorId: 1, name: 'John Doe' },
      { professorId: 2, name: 'Jane Smith' },
    ];

    const result = component.isThereCs({ professorId: 1, name: 'John Doe' });

    expect(result).toBe(true);
  });

  it('should add cs to selectedCs if not found', () => {
    component.selectedCs = [
      { professorId: 1, name: 'John Doe' },
      { professorId: 2, name: 'Jane Smith' },
    ];
    const csToAdd = { professorId: 3, name: 'Another Professor' };

    component.toggleCs(csToAdd);

    expect(component.selectedCs).toContain(csToAdd);
  });

  it('should remove cs from selectedCs if found', () => {
    const csToRemove = { professorId: 1, name: 'John Doe' };
    component.selectedCs = [
      csToRemove,
      { professorId: 2, name: 'Jane Smith' },
    ];

    component.toggleCs(csToRemove);

    expect(component.selectedCs).not.toContain(csToRemove);
  });

  it('should set params.cosupervisors to null if selectedCs and selectedExtCs are empty', () => {
    const csToRemove = { professorId: 1, name: 'John Doe' };

    component.selectedCs = [csToRemove];
    component.selectedExtCs = [];

    component.toggleCs(csToRemove);

    expect(component.params.cosupervisors).toBeNull();
  });

  it('should return true if cs is in selectedExtCs', () => {
    component.selectedExtCs = [
      { externalCoSupervisorId: 1, name: 'External Supervisor 1' },
      { externalCoSupervisorId: 2, name: 'External Supervisor 2' },
    ];

    const result = component.isThereExtCs({ externalCoSupervisorId: 1, name: 'External Supervisor 1' });

    expect(result).toBe(true);
  });

  it('should add cs to selectedExtCs if not found', () => {
    component.selectedExtCs = [
      { externalCoSupervisorId: 1, name: 'External 1' },
      { externalCoSupervisorId: 2, name: 'External 2' },
    ];

    component.toggleExtCs({ externalCoSupervisorId: 3, name: 'New External' });

    expect(component.selectedExtCs).toEqual([
      { externalCoSupervisorId: 1, name: 'External 1' },
      { externalCoSupervisorId: 2, name: 'External 2' },
      { externalCoSupervisorId: 3, name: 'New External' },
    ]);
  });

  it('should remove cs from selectedExtCs if found', () => {
    component.selectedExtCs = [
      { externalCoSupervisorId: 1, name: 'External 1' },
      { externalCoSupervisorId: 2, name: 'External 2' },
    ];

    component.toggleExtCs({ externalCoSupervisorId: 2, name: 'External 2' });

    expect(component.selectedExtCs).toEqual([
      { externalCoSupervisorId: 1, name: 'External 1' },
    ]);
  });

  it('should set params.cosupervisors to null if selectedCs and selectedExtCs are empty', () => {
    const extCsToRemove = { externalCoSupervisorId: 1, name: 'Jane Smith' };

    component.selectedCs = [];
    component.selectedExtCs = [extCsToRemove];

    component.toggleExtCs(extCsToRemove);

    expect(component.params.cosupervisors).toBeNull();
  });

  it('should update proposals and emit newProposals event on successful API call', fakeAsync(() => {
    const apiResponse = [{}];
    apiService.getAllProposals.and.returnValue(Promise.resolve(apiResponse));

    spyOn(component.newProposals, 'emit');

    component.updateProposals();

    tick();

    expect(apiService.getAllProposals).toHaveBeenCalled();

    // Expect proposals to be updated
    expect(component.proposals).toEqual(apiResponse);

    // Expect newProposals event to be emitted with the updated proposals
    expect(component.newProposals.emit).toHaveBeenCalledWith(apiResponse);
  }));

  it('should handle error and emit empty proposals on API call failure', fakeAsync(() => {
    apiService.getAllProposals.and.returnValue(Promise.reject(new Error('API error')));

    spyOn(component.newProposals, 'emit');

    component.updateProposals();

    tick();

    // Expect proposals to be empty
    expect(component.proposals).toEqual([]);

    // Expect newProposals event to be emitted with empty proposals
    expect(component.newProposals.emit).toHaveBeenCalledWith([]);
  }));

  it('should reset selectedDate and params.expirationDate to null and update proposals', () => {
    component.selectedDate = new FormControl(new Date());
    component.params = { expirationDate: '2023-12-31' };

    component.deleteDate();

    expect(component.selectedDate).toBeNull();
    expect(component.params.expirationDate).toBeNull();

    expect(apiService.getAllProposals).toHaveBeenCalledWith(component.params);
  });

  it('should update selectedDate and params.expirationDate and call updateProposals for a month less than 10', () => {
    const dateValue = new Date(2023, 0, 15); // January 15, 2023
    const dateEvent = { value: dateValue } as MatDatepickerInputEvent<any, any>;

    spyOn(component, 'updateProposals');
    component.selectDate(dateEvent);

    expect(component.selectedDate.value).toEqual(dateValue);

    const expectedExpirationDate = '2023-01-15';
    expect(component.params.expirationDate).toEqual(expectedExpirationDate);

    expect(component.updateProposals).toHaveBeenCalled();
  });

  it('should update selectedDate, params.expirationDate, and call updateProposals for a month greater than or equal to 10', fakeAsync(() => {
    const dateValue = new Date(2023, 9, 15); // October 15, 2023
    const dateEvent = { value: dateValue } as MatDatepickerInputEvent<any, any>;

    spyOn(component, 'updateProposals');

    component.selectDate(dateEvent);
    tick();

    expect(component.selectedDate).toEqual(dateEvent);
    expect(component.params.expirationDate).toEqual('2023-10-15');

    expect(component.updateProposals).toHaveBeenCalled();
  }));

  it('should toggle abroad property, update params.abroad, and call updateProposals', fakeAsync(() => {
    if(!component.params) {
      component.params = {};
    }
    component.abroad = false;
    component.params.abroad = null;

    spyOn(component, 'updateProposals');

    component.toggleAbroad();
    tick();

    expect(component.abroad).toBe(true);

    expect(component.params.abroad).toBe(true);

    expect(component.updateProposals).toHaveBeenCalled();
  }));

  it('should toggle abroad property, update params.abroad, and call updateProposals', fakeAsync(() => {
    if(!component.params) {
      component.params = {};
    }
    component.abroad = true;
    component.params.abroad = true;

    spyOn(component, 'updateProposals');

    component.toggleAbroad();
    tick();

    expect(component.abroad).toBe(false);

    expect(component.params.abroad).toBe(null);

    expect(component.updateProposals).toHaveBeenCalled();
  }));

  it('should handle the case where cosupervisors is not null', () => {
    component.params = { cosupervisors: [{ professorId: 1, name: 'John Doe' }] };

    component.ngOnInit();

    expect(component.selectedCs.length).toEqual(1);
    expect(component.selectedExtCs.length).toEqual(0);
  });

  it('should handle the case where extcosupervisors is not null', () => {
    component.params = { cosupervisors: [{ externalCoSupervisorId: 1, name: 'John Doe' }] };

    component.ngOnInit();

    expect(component.selectedCs.length).toEqual(0);
    expect(component.selectedExtCs.length).toEqual(1);
  });
});
