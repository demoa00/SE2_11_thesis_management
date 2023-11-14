import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageSkeletonComponent } from './page-skeleton.component';

describe('PageSkeletonComponent', () => {
  let component: PageSkeletonComponent;
  let fixture: ComponentFixture<PageSkeletonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PageSkeletonComponent]
    });
    fixture = TestBed.createComponent(PageSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
