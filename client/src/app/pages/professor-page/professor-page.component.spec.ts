import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessorPageComponent } from './professor-page.component';
import { ThesisManagementComponent } from './thesis-management/thesis-management.component';
import { PageSkeletonComponent } from 'src/app/shared/components/page-skeleton/page-skeleton.component';
import { IconComponent } from 'src/app/shared/components/icon/icon.component';

describe('ProfessorPageComponent', () => {
  let component: ProfessorPageComponent;
  let fixture: ComponentFixture<ProfessorPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfessorPageComponent, ThesisManagementComponent, PageSkeletonComponent, IconComponent]
    });
    fixture = TestBed.createComponent(ProfessorPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
