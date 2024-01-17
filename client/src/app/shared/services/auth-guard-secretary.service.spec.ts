import { TestBed } from '@angular/core/testing';

import { AuthGuardSecretaryService } from './auth-guard-secretary.service';
import { Router, RouterStateSnapshot } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

describe('AuthGuardSecretaryService', () => {
  let service: AuthGuardSecretaryService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
    });
    service = TestBed.inject(AuthGuardSecretaryService);
    router = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return true if user has secretary role', () => {
    const spyRouterNavigate = spyOn(router, 'navigate');

    localStorage.setItem('user', JSON.stringify({ role: 'secretary' }));
    const canActivateResult = service.canActivate(null!, {} as RouterStateSnapshot);

    expect(canActivateResult).toBe(true);
    expect(spyRouterNavigate).not.toHaveBeenCalled();
  });

  it('should navigate to default route if user has no role', () => {
    const spyRouterNavigate = spyOn(router, 'navigate');

    localStorage.removeItem('user');
    const canActivateResult = service.canActivate(null!, {} as RouterStateSnapshot);

    expect(canActivateResult).toBe(false);
    expect(spyRouterNavigate).toHaveBeenCalledWith(['']);
  });

  it('should navigate to default route if user role is not "secretary"', () => {
    const spyRouterNavigate = spyOn(router, 'navigate');

    localStorage.setItem('user', JSON.stringify({ role: 'admin' }));
    const canActivateResult = service.canActivate(null!, {} as RouterStateSnapshot);

    expect(canActivateResult).toBe(false);
    expect(spyRouterNavigate).toHaveBeenCalledWith(['']);
  });
});
