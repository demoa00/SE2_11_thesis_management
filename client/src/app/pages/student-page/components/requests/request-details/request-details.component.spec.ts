import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestDetailsComponent } from './request-details.component';
import { ProposalDetailsComponent } from '../../proposals/proposal-details/proposal-details.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ButtonComponent } from 'src/app/shared/components/button/button.component';
import { AlertComponent } from 'src/app/shared/alert/alert.component';

describe('RequestDetailsComponent', () => {
  let component: RequestDetailsComponent;
  let fixture: ComponentFixture<RequestDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [RequestDetailsComponent, ProposalDetailsComponent, ButtonComponent, AlertComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RequestDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
