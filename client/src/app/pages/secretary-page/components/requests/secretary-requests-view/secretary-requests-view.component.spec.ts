import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecretaryRequestsViewComponent } from './secretary-requests-view.component';

describe('SecretaryRequestsViewComponent', () => {
  let component: SecretaryRequestsViewComponent;
  let fixture: ComponentFixture<SecretaryRequestsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SecretaryRequestsViewComponent]
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
