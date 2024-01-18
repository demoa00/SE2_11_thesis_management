import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationDetailsComponent } from './application-details.component';
import { ProposalDetailsComponent } from '../../proposals/proposal-details/proposal-details.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ButtonComponent } from 'src/app/shared/components/button/button.component';
import { AlertComponent } from 'src/app/shared/alert/alert.component';

describe('ApplicationDetailsComponent', () => {
  let component: ApplicationDetailsComponent;
  let fixture: ComponentFixture<ApplicationDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ApplicationDetailsComponent, ProposalDetailsComponent, ButtonComponent, AlertComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ApplicationDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
