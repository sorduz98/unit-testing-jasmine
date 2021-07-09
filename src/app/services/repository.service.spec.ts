import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { SpyObj } from 'spec/models/spy-obj.interface';
import { ApiService } from './api.service';
import { PINS } from './mocks/pins';
import { RepositoryService } from './repository.service';

fdescribe('RepositoryService', () => {
  let service: RepositoryService;
  let apiServiceSpy: SpyObj = jasmine.createSpyObj('ApiService', ['get', 'put', 'post']);

  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      RepositoryService,
      { provide: ApiService, useValue: apiServiceSpy }
    ]
  }));

  beforeEach(() => {
    service = TestBed.get(RepositoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('When excuted getPins', () => {
    it('Should return PINS mock', () => {
      spyOnProperty(service, 'environment').and.returnValue({ mocks: true });
      service.getPins().subscribe(response => {
        expect(response).toEqual(PINS);
      });
    });

    it('Should return API response', () => {
      const apiResponse = {
        data: "Testing",
        messages: []
      };
      spyOnProperty(service, 'environment').and.returnValue({ mocks: false });
      apiServiceSpy.get.and.returnValue(of(apiResponse));
      service.getPins().subscribe(response => {
        expect(apiServiceSpy.get).toHaveBeenCalled();
        expect(response).toEqual(apiResponse);
      });
    });
  });

  describe('When excuted savePins', () => {
    it('Should return Body mock', () => {
      spyOnProperty(service, 'environment').and.returnValue({ mocks: true });
      const body = {
        title: 'Muy lejano',
        description: 'Reino magico'
      };
      service.savePins(body).subscribe(response => {
        expect(response).toEqual(body);
      });
    });

    it('Should return API response', () => {
      const apiResponse = {
        data: "Testing",
        messages: []
      };
      const body = {
        title: 'Muy lejano',
        description: 'Reino magico'
      };
      spyOnProperty(service, 'environment').and.returnValue({ mocks: false });
      apiServiceSpy.post.and.returnValue(of(apiResponse));
      service.savePins(body).subscribe(response => {
        expect(apiServiceSpy.post).toHaveBeenCalledWith('', body);
        expect(response).toEqual(apiResponse);
      });
    });
  });

  describe('When excuted updatePin', () => {
    it('Should return Body mock', () => {
      spyOnProperty(service, 'environment').and.returnValue({ mocks: true });
      const body = {
        title: 'Muy lejano',
        description: 'Reino magico'
      };
      const id = 'As123';
      service.updatePin(id, body).subscribe(response => {
        expect(response).toEqual(body);
      });
    });

    it('Should return API response', () => {
      const apiResponse = {
        data: "Testing",
        messages: []
      };
      const body = {
        title: 'Muy lejano',
        description: 'Reino magico'
      };
      const id = 'As123';
      spyOnProperty(service, 'environment').and.returnValue({ mocks: false });
      apiServiceSpy.put.and.returnValue(of(apiResponse));
      service.updatePin(id, body).subscribe(response => {
        expect(apiServiceSpy.put).toHaveBeenCalledWith(`/${id}`, body);
        expect(response).toEqual(apiResponse);
      });
    });
  });
});
