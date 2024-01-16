import { TestBed } from '@angular/core/testing';

import { AuthGuardSecretaryService } from './auth-guard-secretary.service';

describe('AuthGuardSecretaryService', () => {
  let service: AuthGuardSecretaryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthGuardSecretaryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
