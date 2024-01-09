import { TestBed } from '@angular/core/testing';

import { AuthGuardStudentService } from './auth-guard-student.service';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

describe('AuthGuardStudentService', () => {
  let service: AuthGuardStudentService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule]
    });
    service = TestBed.inject(AuthGuardStudentService);
    router = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should allow navigation for a student', () => {
    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify({ role: 'student' }));
    const canActivate = service.canActivate(null!, null!);
    expect(canActivate).toBeTruthy();
  });

  it('should redirect to professor page for a professor', () => {
    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify({ role: 'professor' }));
    const navigateSpy = spyOn(router, 'navigate');
    const canActivate = service.canActivate(null!, null!);
    expect(canActivate).toBeFalsy();
    expect(navigateSpy).toHaveBeenCalledWith(['professor']);
  });

  it('should redirect to home for an unauthorized user', () => {
    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify({ role: 'other' }));
    const navigateSpy = spyOn(router, 'navigate');
    const canActivate = service.canActivate(null!, null!);
    expect(canActivate).toBeFalsy();
    expect(navigateSpy).toHaveBeenCalledWith(['']);
  });

  it('should redirect to home for an undefined user', () => {
    spyOn(localStorage, 'getItem').and.returnValue(null);
    const navigateSpy = spyOn(router, 'navigate');
    const canActivate = service.canActivate(null!, null!);
    expect(canActivate).toBeFalsy();
    expect(navigateSpy).toHaveBeenCalledWith(['']);
  });
});
