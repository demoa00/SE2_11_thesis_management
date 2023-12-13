import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApllicantDetailsComponent } from './apllicant-details.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { IconComponent } from 'src/app/shared/components/icon/icon.component';

describe('ApllicantDetailsComponent', () => {
  let component: ApllicantDetailsComponent;
  let fixture: ComponentFixture<ApllicantDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ApllicantDetailsComponent, IconComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ApllicantDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
