import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecretaryRequestDetailsComponent } from './secretary-request-details.component';

describe('SecretaryRequestDetailsComponent', () => {
  let component: SecretaryRequestDetailsComponent;
  let fixture: ComponentFixture<SecretaryRequestDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SecretaryRequestDetailsComponent]
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
