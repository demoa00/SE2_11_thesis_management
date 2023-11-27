import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { ThesisManagementComponent } from './thesis-management.component';
import { IconComponent } from 'src/app/shared/components/icon/icon.component';

describe('ThesisManagementComponent', () => {
  let component: ThesisManagementComponent;
  let fixture: ComponentFixture<ThesisManagementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ThesisManagementComponent, IconComponent]
    });
    fixture = TestBed.createComponent(ThesisManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle createPopup property on OpenCreatePopup', fakeAsync(() => {
    const component = new ThesisManagementComponent();

    component.openCreatePopup();
    fixture.detectChanges();
    tick();
    expect(component.createPopup).toBeTruthy();

    component.openCreatePopup();
    fixture.detectChanges();
    tick();
    expect(component.createPopup).toBeFalsy();
  }));

  it('should set showApplicants to true and others to false on showApplicantsTable', () => {
    const component = new ThesisManagementComponent();
    component.showApplicantsTable();
    expect(component.showApplicants).toBe(true);
    expect(component.showActiveTheses).toBe(false);
    expect(component.showArchivedTheses).toBe(false);
  });

  it('should set showActiveThesis to true and others to false on showActiveThesesTable', () => {
    const component = new ThesisManagementComponent();
    component.showActiveThesesTable();
    expect(component.showApplicants).toBe(false);
    expect(component.showActiveTheses).toBe(true);
    expect(component.showArchivedTheses).toBe(false);
  });

  it('should set showArchivedThesis to true and others to false on showArchivedThesesTable', () => {
    const component = new ThesisManagementComponent();
    component.showArchivedThesesTable();
    expect(component.showApplicants).toBe(false);
    expect(component.showActiveTheses).toBe(false);
    expect(component.showArchivedTheses).toBe(true);
  });
});
