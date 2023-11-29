import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { PageSkeletonComponent } from './page-skeleton.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ButtonComponent } from '../button/button.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('PageSkeletonComponent', () => {
  let component: PageSkeletonComponent;
  let fixture: ComponentFixture<PageSkeletonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      declarations: [PageSkeletonComponent, ButtonComponent],
    });
    fixture = TestBed.createComponent(PageSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
