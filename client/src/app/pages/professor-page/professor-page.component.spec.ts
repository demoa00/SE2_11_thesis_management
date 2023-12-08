import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessorPageComponent } from './professor-page.component';
import { ThesisManagementComponent } from './thesis-management/thesis-management.component';
import { PageSkeletonComponent } from 'src/app/shared/components/page-skeleton/page-skeleton.component';
import { IconComponent } from 'src/app/shared/components/icon/icon.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatIconModule } from '@angular/material/icon';

describe('ProfessorPageComponent', () => {
  let component: ProfessorPageComponent;
  let fixture: ComponentFixture<ProfessorPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, MatIconModule],
      declarations: [ProfessorPageComponent, ThesisManagementComponent, PageSkeletonComponent, IconComponent]
    });
    fixture = TestBed.createComponent(ProfessorPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update selected property on menu item click', () => {
    component.selectMenuItem(2);

    expect(component.menuItems[0].selected).toBe(false);
    expect(component.menuItems[1].selected).toBe(true);
    expect(component.menuItems[2].selected).toBe(false);

    component.selectMenuItem(3);

    expect(component.menuItems[0].selected).toBe(false);
    expect(component.menuItems[1].selected).toBe(false);
    expect(component.menuItems[2].selected).toBe(true);
  });
});
