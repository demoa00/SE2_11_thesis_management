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

    it('should make a GET request for blob data and return it', fakeAsync(() => {
        const testData = new Blob(['Test blob data'], { type: 'application/octet-stream' });
        
        let result: any;
    
        httpService.getBlob('sample-path').then(data => {
            result = data;
        });
    
        const req = httpTestingController.expectOne('http://localhost:3000/api/sample-path');
        expect(req.request.method).toBe('GET');
    
        req.flush(testData);
    
        tick();
    
        expect(result).toEqual(testData);
    }));

    it('should make a POST request with blob response and return data', fakeAsync(() => {
        const testData = new Blob(['This is a blob response'], { type: 'text/plain' });
        const requestBody = { key: 'value' };
        let result: any;

        httpService.postBlob('sample-path', requestBody).then(response => {
            result = response;
        });

        const req = httpTestingController.expectOne('http://localhost:3000/api/sample-path');
        expect(req.request.method).toBe('POST');

        req.flush(testData, {
            status: 200,
            statusText: 'OK',
            headers: { 'Content-Type': 'application/octet-stream' }
        });

        tick();

        expect(result.body).toEqual(testData);
    }));

    it('should make a PUT request with options and return data', fakeAsync(() => {
        const testData = { result: 'Updated' };
        const requestBody = { key: 'new-value' };
        const options = { headers: { 'custom-header': 'custom-value' } };
        let result: any;
    
        httpService.putWithOptions('sample-path', requestBody, options).then(response => {
            result = response.body;
        });
    
        const req = httpTestingController.expectOne(request => {
            return (
                request.method === 'PUT' &&
                request.url === 'http://localhost:3000/api/sample-path' &&
                request.body === requestBody &&
                request.headers.get('custom-header') === 'custom-value'
            );
        });
    
        expect(req.request.method).toBe('PUT');
        expect(req.request.url).toBe('http://localhost:3000/api/sample-path');
        expect(req.request.body).toEqual(requestBody);
        expect(req.request.headers.get('custom-header')).toBe('custom-value');
    
        req.flush(testData);
    
        tick();
    
        expect(result).toEqual(testData);
    }));

    it('should handle unsuccessful response (status >= 400)', fakeAsync(() => {
        const errorResponse = { status: 404, message: 'Error' };
      
        let result: any;
      
        httpService['makeRequest'](async () => {
          return Promise.resolve(errorResponse);
        })
        .then(data => {
          result = data;
        })
        .catch(error => {
          result = error;
        });
      
        tick();
      
        const expectedErrorMessage = errorResponse.message;
      
        expect(result instanceof Error).toBeTruthy();
        expect(result.message).toBe(expectedErrorMessage);
    }));

    it('should handle error during execution', fakeAsync(() => {
        const errorMessage = 'An error occurred.';
      
        let result: any;
      
        httpService['makeRequest'](async () => {
          throw new Error(errorMessage);
        })
        .catch(error => {
          result = error;
        });
      
        tick();
      
        expect(result instanceof Error).toBeTruthy();
        expect(result.message).toContain(errorMessage);
    }));
      
});