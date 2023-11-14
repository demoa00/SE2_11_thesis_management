import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { HomePageComponent } from './home-page.component';
import { ButtonComponent } from 'src/app/shared/components/button/button.component';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { PageSkeletonComponent } from 'src/app/shared/components/page-skeleton/page-skeleton.component';

describe('HomePageComponent', () => {
  let component: HomePageComponent;
  let fixture: ComponentFixture<HomePageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [HomePageComponent, ButtonComponent, PageSkeletonComponent]
    });
    fixture = TestBed.createComponent(HomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("should initialize email and password", () => {
    // Create a mock router
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    const component = new HomePageComponent(routerSpy);
    expect(component.email).toBe('');
    expect(component.password).toBe('');
  });

  it('should update email and password', fakeAsync(() => {
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    const component = new HomePageComponent(routerSpy);
    component.updateEmail('test@example.com');
    component.updatePassword('testpassword');
    fixture.detectChanges();
    tick();
    expect(component.email).toBe('test@example.com');
    expect(component.password).toBe('testpassword');
  }));
  
  it("should navigate to student route for valid student credentials", fakeAsync(() => {
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    const component = new HomePageComponent(routerSpy);
    component.email = 's123456@studenti.polito.it';
    component.password = 'password';
    
    fixture.detectChanges();
    tick();
    
    component.login();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/student']);
  }));

  it("should navigate to professor route for valid professor credentials", fakeAsync(() => {
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    const component = new HomePageComponent(routerSpy);

    component.email = 'p123456@polito.it';
    component.password = 'password';
    
    fixture.detectChanges();
    tick();
    
    component.login();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/professor']);
  }));

  it("should alert for invalid credentials", fakeAsync(() => {
    spyOn(window, 'alert');

    const component = new HomePageComponent({} as Router); // Pass an empty object for the Router, as it's not used in this test

    component.email = 'invalid@example.com';
    component.password = 'invalidpassword';

    fixture.detectChanges();
    tick();

    component.login();
    expect(window.alert).toHaveBeenCalledWith('Email o password errati');
  }));
});
