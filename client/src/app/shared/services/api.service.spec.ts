import { TestBed, fakeAsync, tick } from '@angular/core/testing';

import { APIService } from './api.service';
import { HttpService } from './http.service';
import { of, throwError } from 'rxjs';

describe('APIService', () => {
  let apiService: APIService;
  let httpServiceSpy: jasmine.SpyObj<HttpService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('HttpService', ['formPost']);

    TestBed.configureTestingModule({
      providers: [
        APIService,
        { provide: HttpService, useValue: spy }
      ]
    });
    
    apiService = TestBed.inject(APIService);
    httpServiceSpy = TestBed.inject(HttpService) as jasmine.SpyObj<HttpService>;
  });

  it('should be created', () => {
    expect(apiService).toBeTruthy();
  });

  it('should handle successful login', fakeAsync(() => {
    const username = 'testUser';
    const password = 'testPassword';
    const mockResponse = { };

    httpServiceSpy.formPost.and.returnValue(of(mockResponse).toPromise());

    spyOn(console, 'log');

    apiService.login(username, password);

    tick();

    expect(console.log).toHaveBeenCalledWith('response');
    expect(console.log).toHaveBeenCalledWith(mockResponse);
  }));

  it('should handle login error', fakeAsync(() => {
    const username = 'testUser';
    const password = 'testPassword';
    const mockError = new Error('Test error');

    httpServiceSpy.formPost.and.returnValue(throwError(mockError).toPromise());

    spyOn(console, 'log');

    apiService.login(username, password);

    tick();

    expect(console.log).toHaveBeenCalledWith('error');
    expect(console.log).toHaveBeenCalledWith(mockError);
  }));
});
