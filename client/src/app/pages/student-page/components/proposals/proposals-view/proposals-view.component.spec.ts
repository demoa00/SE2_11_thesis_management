import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProposalsViewComponent } from './proposals-view.component';

describe('ProposalsComponent', () => {
  let component: ProposalsViewComponent;
  let fixture: ComponentFixture<ProposalsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProposalsViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProposalsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
