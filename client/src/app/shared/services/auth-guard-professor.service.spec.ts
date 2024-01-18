import { TestBed } from '@angular/core/testing';

import { AuthGuardProfessorService } from './auth-guard-professor.service';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

describe('AuthGuardProfessorService', () => {
  let service: AuthGuardProfessorService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule]
    });
    service = TestBed.inject(AuthGuardProfessorService);
    router = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should allow navigation for a professor', () => {
    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify({ role: 'professor' }));
    const canActivate = service.canActivate(null!, null!);
    expect(canActivate).toBeTruthy();
  });

  it('should redirect to student page for a student', () => {
    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify({ role: 'student' }));
    const navigateSpy = spyOn(router, 'navigate');
    const canActivate = service.canActivate(null!, null!);
    expect(canActivate).toBeFalsy();
    expect(navigateSpy).toHaveBeenCalledWith(['student']);
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
