import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePageComponent } from './home-page.component';
import { ButtonComponent } from 'src/app/shared/components/button/button.component';
import { FormsModule } from '@angular/forms';
import { PageSkeletonComponent } from 'src/app/shared/components/page-skeleton/page-skeleton.component';
import { PopupComponent } from 'src/app/shared/components/popup-conferma/popup.component';
import { AlertComponent } from 'src/app/shared/alert/alert.component';
import { LoginFormComponent } from 'src/app/shared/components/login-form/login-form.component';
import { HttpClientModule } from '@angular/common/http';

describe('HomePageComponent', () => {
  let component: HomePageComponent;
  let fixture: ComponentFixture<HomePageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, HttpClientModule],
      declarations: [HomePageComponent, ButtonComponent, PageSkeletonComponent, PopupComponent, AlertComponent, LoginFormComponent]
    });
    fixture = TestBed.createComponent(HomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
