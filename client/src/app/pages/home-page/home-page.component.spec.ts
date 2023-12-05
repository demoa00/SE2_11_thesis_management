import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { HomePageComponent } from './home-page.component';
import { ButtonComponent } from 'src/app/shared/components/button/button.component';
import { FormsModule } from '@angular/forms';
import { PageSkeletonComponent } from 'src/app/shared/components/page-skeleton/page-skeleton.component';
import { PopupComponent } from 'src/app/shared/components/popup-conferma/popup.component';
import { AlertComponent } from 'src/app/shared/alert/alert.component';
import { of } from 'rxjs';
import { AuthService } from '@auth0/auth0-angular';
import { LoadingComponent } from 'src/app/shared/components/loading/loading.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('HomePageComponent', () => {
  let component: HomePageComponent;
  let fixture: ComponentFixture<HomePageComponent>;

  const authServiceMock = {
    isAuthenticated$: of(true),
    loginWithRedirect: () => {},
    logout: () => {}
  };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [HomePageComponent, ButtonComponent, PageSkeletonComponent, PopupComponent, AlertComponent, LoadingComponent],
      imports: [FormsModule, HttpClientTestingModule],
      providers: [
        { provide: AuthService, useValue: authServiceMock },
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
