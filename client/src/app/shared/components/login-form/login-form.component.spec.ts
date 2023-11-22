import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginFormComponent } from './login-form.component';
import { HttpClientModule } from '@angular/common/http';
import { ButtonComponent } from '../button/button.component';
import { FormsModule } from '@angular/forms';

describe('LoginFormComponent', () => {
  let component: LoginFormComponent;
  let fixture: ComponentFixture<LoginFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, FormsModule],
      declarations: [LoginFormComponent, ButtonComponent]
    });
    fixture = TestBed.createComponent(LoginFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
