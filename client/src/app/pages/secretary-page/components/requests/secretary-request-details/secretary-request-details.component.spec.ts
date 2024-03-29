import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecretaryRequestDetailsComponent } from './secretary-request-details.component';
import { ProposalDetailsComponent } from 'src/app/pages/student-page/components/proposals/proposal-details/proposal-details.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ButtonComponent } from 'src/app/shared/components/button/button.component';
import { AlertComponent } from 'src/app/shared/alert/alert.component';

describe('SecretaryRequestDetailsComponent', () => {
  let component: SecretaryRequestDetailsComponent;
  let fixture: ComponentFixture<SecretaryRequestDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [SecretaryRequestDetailsComponent, ProposalDetailsComponent, ButtonComponent, AlertComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SecretaryRequestDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
