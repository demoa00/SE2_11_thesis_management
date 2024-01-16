import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecretaryPageComponent } from './secretary-page.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PageSkeletonComponent } from 'src/app/shared/components/page-skeleton/page-skeleton.component';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

describe('SecretaryPageComponent', () => {
  let component: SecretaryPageComponent;
  let fixture: ComponentFixture<SecretaryPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, MatIconModule, MatDatepickerModule, MatNativeDateModule],
      declarations: [SecretaryPageComponent, PageSkeletonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SecretaryPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
