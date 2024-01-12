import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestsComponent } from './requests.component';
import { ButtonComponent } from 'src/app/shared/components/button/button.component';
import { PopupComponent } from 'src/app/shared/components/popup-conferma/popup.component';
import { RequestFormComponent } from './components/request-form/request-form.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { IconComponent } from 'src/app/shared/components/icon/icon.component';
import { FormsModule } from '@angular/forms';

describe('RequestsComponent', () => {
  let component: RequestsComponent;
  let fixture: ComponentFixture<RequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, FormsModule],
      declarations: [RequestsComponent, ButtonComponent, PopupComponent, RequestFormComponent, IconComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
