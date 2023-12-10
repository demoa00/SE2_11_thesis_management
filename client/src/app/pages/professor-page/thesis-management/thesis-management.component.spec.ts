import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { ThesisManagementComponent } from './thesis-management.component';
import { IconComponent } from 'src/app/shared/components/icon/icon.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PopupComponent } from 'src/app/shared/components/popup-conferma/popup.component';
import { CreateThesisFormComponent } from './create-thesis-form/create-thesis-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { APIService } from 'src/app/shared/services/api.service';
import { of } from 'rxjs';

describe('ThesisManagementComponent', () => {
  let component: ThesisManagementComponent;
  let fixture: ComponentFixture<ThesisManagementComponent>;
  let apiService: APIService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ReactiveFormsModule],
      declarations: [ThesisManagementComponent, IconComponent, PopupComponent, CreateThesisFormComponent],
      providers: [APIService]
    });
    fixture = TestBed.createComponent(ThesisManagementComponent);
    component = fixture.componentInstance;
    apiService = TestBed.inject(APIService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle createPopup property on OpenCreatePopup', fakeAsync(() => {
    component.openCreatePopup();
    fixture.detectChanges();
    tick();
    expect(component.createPopup).toBeTruthy();

    component.openCreatePopup();
    fixture.detectChanges();
    tick();
    expect(component.createPopup).toBeFalsy();
  }));

  it('should set showApplicants to true and others to false on showApplicantsTable', fakeAsync(() => {
    spyOn(apiService, 'getApplications').and.returnValue(of({}).toPromise());
    component.showApplicantsTable();
    tick();
    expect(component.showApplicants).toBe(true);
    expect(component.showActiveTheses).toBe(false);
    expect(component.showArchivedTheses).toBe(false);
  }));

  it('should set showActiveThesis to true and others to false on showActiveThesesTable', fakeAsync(() => {
    spyOn(apiService, 'getAllActiveTheses').and.returnValue(of({}).toPromise());
    component.showActiveThesesTable();
    tick();
    expect(component.showApplicants).toBe(false);
    expect(component.showActiveTheses).toBe(true);
    expect(component.showArchivedTheses).toBe(false);
  }));

  it('should set showArchivedThesis to true and others to false on showArchivedThesesTable', fakeAsync(() => {
    spyOn(apiService, 'getAllArchivedTheses').and.returnValue(of({}).toPromise());
    component.showArchivedThesesTable();
    tick();
    expect(component.showApplicants).toBe(false);
    expect(component.showActiveTheses).toBe(false);
    expect(component.showArchivedTheses).toBe(true);
  }));
});
