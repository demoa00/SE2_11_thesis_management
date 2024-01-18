import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecretaryRequestsViewComponent } from './secretary-requests-view.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('SecretaryRequestsViewComponent', () => {
  let component: SecretaryRequestsViewComponent;
  let fixture: ComponentFixture<SecretaryRequestsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [SecretaryRequestsViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SecretaryRequestsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
