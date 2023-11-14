import { ComponentFixture, TestBed } from '@angular/core/testing';

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
});
