import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { LoginFormComponent } from './login-form.component';
import { HttpClientModule } from '@angular/common/http';
import { ButtonComponent } from '../button/button.component';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { AuthService } from '@auth0/auth0-angular';

describe('LoginFormComponent', () => {
  let component: LoginFormComponent;
  let fixture: ComponentFixture<LoginFormComponent>;

  const authServiceMock = {
    loginWithRedirect: () => {},
    user$: of({})
  };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, FormsModule],
      declarations: [LoginFormComponent, ButtonComponent],
      providers: [
        { provide: AuthService, useValue: authServiceMock }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
