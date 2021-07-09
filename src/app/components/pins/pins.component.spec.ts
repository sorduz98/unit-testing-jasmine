import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule, MatInputModule, MatSnackBar } from '@angular/material';
import { of, Subject } from 'rxjs';

import { SpyObj } from 'spec/models/spy-obj.interface';
import { PINS } from 'src/app/services/mocks/pins';
import { RepositoryService } from 'src/app/services/repository.service';
import { PinsComponent } from './pins.component';
import { PinsService } from './pins.service';

class PinsServiceSpy {
  observer = new Subject();
  $actionObserver = this.observer.asObservable();
  resolve = (action) => this.observer.next(action);
}

fdescribe('PinsComponent', () => {
  let component: PinsComponent;
  let fixture: ComponentFixture<PinsComponent>;

  let repositoryServiceSpy: SpyObj = jasmine.createSpyObj('RepositoryService', ['getPins', 'updatePin']);
  let matSnackBarSpy: SpyObj = jasmine.createSpyObj('MatSnackBar', ['open']);

  beforeEach(() => {
    repositoryServiceSpy.getPins.and.returnValue(of(JSON.parse(JSON.stringify(PINS))));
    repositoryServiceSpy.updatePin.and.returnValue(of(true));
  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PinsComponent ],
      providers: [
        { provide: RepositoryService, useValue: repositoryServiceSpy },
        { provide: MatSnackBar, useValue: matSnackBarSpy },
        { provide: PinsService, useClass: PinsServiceSpy },
      ],
      imports: [
        ReactiveFormsModule
      ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PinsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('When new page is open', () => {
    const windowSpy = spyOn(window, 'open').and.callFake(() => null);
    const URL = 'https://platzi.com';
    component.openUrl(URL);
    expect(windowSpy).toHaveBeenCalledWith(URL, '_blank');
  });

  it('When update progress', () => {
    component.pins = PINS;
    const { _id, url, ...pin } = PINS[0];
    const pinService: PinsServiceSpy = TestBed.get(PinsService);
    pinService.resolve('save');

    expect(repositoryServiceSpy.updatePin).toHaveBeenCalledWith(_id, pin);
    expect(matSnackBarSpy.open).toHaveBeenCalled();
  });
});
