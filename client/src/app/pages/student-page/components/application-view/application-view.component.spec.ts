import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationViewComponent } from './application-view.component';

describe('ApplicationViewComponent', () => {
  let component: ApplicationViewComponent;
  let fixture: ComponentFixture<ApplicationViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ApplicationViewComponent]
    });
    fixture = TestBed.createComponent(ApplicationViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
