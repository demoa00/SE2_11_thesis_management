import { TestBed } from '@angular/core/testing';

import { AuthGuardStudentService } from './auth-guard-student.service';

describe('AuthGuardStudentService', () => {
  let service: AuthGuardStudentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthGuardStudentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
