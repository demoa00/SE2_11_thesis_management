import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePageComponent } from './home-page.component';
import { ButtonComponent } from 'src/app/shared/components/button/button.component';
import { FormsModule } from '@angular/forms';
import { PageSkeletonComponent } from 'src/app/shared/components/page-skeleton/page-skeleton.component';
import { PopupComponent } from 'src/app/shared/components/popup-conferma/popup.component';
import { AlertComponent } from 'src/app/shared/alert/alert.component';

describe('HomePageComponent', () => {
  let component: HomePageComponent;
  let fixture: ComponentFixture<HomePageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [HomePageComponent, ButtonComponent, PageSkeletonComponent, PopupComponent, AlertComponent]
    });
    fixture = TestBed.createComponent(HomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update email property on updateEmail method call', () => {
    component.updateEmail('test@example.com');
  
    expect(component.email).toEqual('test@example.com');
  });

  it('should update password property on updatePassword method call', () => {
    component.updatePassword('password123');
  
    expect(component.password).toEqual('password123');
  });

  it('should navigate to student page on successful student login', () => {
    spyOn(component['_router'], 'navigate'); // Spy on router.navigate
  
    component.email = 's123456';
    component.password = 'password';
    component.login();
  
    expect(component['_router'].navigate).toHaveBeenCalledWith(['/student']);
  });

  it('should navigate to professor page on successful professor login', () => {
    spyOn(component['_router'], 'navigate'); // Spy on router.navigate
  
    component.email = 'p123456';
    component.password = 'password';
    component.login();
  
    expect(component['_router'].navigate).toHaveBeenCalledWith(['/professor']);
  });

  it('should show alert on failed login attempt', () => {
    component.email = 'invalid';
    component.password = 'invalid';
    component.login();
  
    expect(component.showAlert).toBeTruthy();
    expect(component.loginFailed).toBeTruthy();
  });
});
