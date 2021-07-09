import { getTestBed, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ApiService } from './api.service';
import { environment } from 'src/environments/environment';
import { HttpHeaders } from '@angular/common/http';

fdescribe('ApiService', () => {
  const inject = (token: any, notFoundValue?: any): any => getTestBed().get(token, notFoundValue);

  let service: ApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => TestBed.configureTestingModule({
    providers: [ApiService],
    imports: [HttpClientTestingModule]
  }));

  beforeEach(() => {
    service = TestBed.get(ApiService);
    httpMock = inject(HttpTestingController);
  });

  afterAll(() => {
    service = null;
    httpMock = null;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('GET', () => {
    it('Should excute GET', () => {
      const endpointUrl = '/test';
      const result = 'Testing!';

      service.get(endpointUrl).subscribe(response => {
        expect(response).toBe(result);
      });

      const request = httpMock.expectOne(environment.apiEndpoint + endpointUrl);
      expect(request.request.method).toBe('GET');
      request.flush(result);
    });

    it('Should excute GET with headers', () => {
      const endpointUrl = '/test';
      const result = 'Testing!';
      const headers = new HttpHeaders().set('platzi-headers', 'cristian-rules');

      service.get(endpointUrl, headers).subscribe(response => {
        expect(response).toBe(result);
      });

      const request = httpMock.expectOne(environment.apiEndpoint + endpointUrl);
      expect(request.request.method).toBe('GET');
      expect(request.request.headers.get('platzi-headers')).toBe('cristian-rules');
      request.flush(result);
    });
  });

  describe('POST', () => {
    it('Should excute POST', () => {
      const endpointUrl = '/test';
      const result = 'Testing!';
      const body = {
        name: 'testeando',
        code: 'T3ST'
      };


      service.post(endpointUrl, body).subscribe(response => {
        expect(response).toBe(result);
      });

      const request = httpMock.expectOne(environment.apiEndpoint + endpointUrl);
      expect(request.request.method).toBe('POST');
      expect(request.request.body).toEqual(body);
      request.flush(result);
    });
  });

  describe('PUT', () => {
    it('Should excute PUT', () => {
      const endpointUrl = '/test';
      const result = 'Testing!';
      const body = {
        name: 'testeando',
        code: 'T3ST'
      };


      service.put(endpointUrl, body).subscribe(response => {
        expect(response).toBe(result);
      });

      const request = httpMock.expectOne(environment.apiEndpoint + endpointUrl);
      expect(request.request.method).toBe('PUT');
      expect(request.request.body).toEqual(body);
      request.flush(result);
    });
  });

  describe('DELETE', () => {
    it('Should excute DELETE', () => {
      const endpointUrl = '/test';
      const result = 'Testing!';



      service.delete(endpointUrl).subscribe(response => {
        expect(response).toBe(result);
      });

      const request = httpMock.expectOne(environment.apiEndpoint + endpointUrl);
      expect(request.request.method).toBe('DELETE');
      request.flush(result);
    });
  });
});
