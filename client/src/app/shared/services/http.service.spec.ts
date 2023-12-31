import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpService } from './http.service';
import { HttpClient } from '@angular/common/http';

describe('HTTPService', () => {
    let httpService: HttpService;
    let httpTestingController: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [HttpService]
        });

        httpService = TestBed.inject(HttpService);
        httpTestingController = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpTestingController.verify();
    });

    it('should be created', () => {
        expect(httpService).toBeTruthy();
    });

    it('should make a GET request and return data', fakeAsync(() => {
        const testData = { message: 'Hello, World!' };
        let result: any;
    
        httpService.get('sample-path').then(data => {
          result = data;
        });
    
        // Set up a mock request
        const req = httpTestingController.expectOne('http://localhost:3000/api/sample-path');
        expect(req.request.method).toBe('GET');
    
        // Respond with mock data
        req.flush(testData);
    
        tick();
    
        expect(result).toEqual(testData);
    }));

    it('should make a POST request and return data', fakeAsync(() => {
        const testData = { result: 'Success' };
        const requestBody = { key: 'value' };
        let result: any;
    
        httpService.post('sample-path', requestBody).then(response => {
          result = response.body;
        });
    
        const req = httpTestingController.expectOne('http://localhost:3000/api/sample-path');
        expect(req.request.method).toBe('POST');
    
        req.flush(testData);
    
        tick();
    
        expect(result).toEqual(testData);
    }));

    it('should make a PUT request and return data', fakeAsync(() => {
        const testData = { result: 'Updated' };
        const requestBody = { key: 'new-value' };
        let result: any;
    
        httpService.put('sample-path', requestBody).then(response => {
          result = response.body;
        });
    
        const req = httpTestingController.expectOne('http://localhost:3000/api/sample-path');
        expect(req.request.method).toBe('PUT');
    
        req.flush(testData);
    
        tick();
    
        expect(result).toEqual(testData);
    }));

    it('should make a DELETE request', fakeAsync(() => {
        const path = 'sample-path';

        httpService.delete(path).then(response => {
            expect(response).toBeTruthy();
        })

        const req = httpTestingController.expectOne('http://localhost:3000/api/sample-path');

        expect(req.request.method).toBe('DELETE');

        req.flush(null, { status: 204, statusText: 'No Content' });

        tick();
    }));

    it('should construct URL without prefix', () => {
        const path = 'sample-path';
        const constructedUrl = httpService.url(path, false);
        expect(constructedUrl).toBe('http://localhost:3000/api' +  path);
    });

    it('should construct and send form data for POST request', () => {
        const path = 'sample-path';
        const formData = { key1: 'value1', key2: 'value2' };
    
        httpService.formPost(path, formData);
    
        const req = httpTestingController.expectOne('http://localhost:3000/api/' + path);
    
        expect(req.request.method).toBe('POST');
        expect(req.request.headers.get('Content-Type')).toBe('application/x-www-form-urlencoded');
    
        req.flush(null, { status: 200, statusText: 'OK' });
    });

    it('should return the HttpClient instance', () => {
        const HttpClientInstance = TestBed.inject(HttpClient);
        const result = httpService.client();

        expect(result).toBe(HttpClientInstance);
    });

    it('should return the path directly if it starts with "http"', () => {
        const path = 'http://example.com/api/data';
        const result = httpService.url(path);

        expect(result).toEqual(path);
    });
});