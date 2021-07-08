import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormArray, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { of } from 'rxjs';
import { NavigationService } from 'src/app/services/navigation.service';
import { RepositoryService } from 'src/app/services/repository.service';

import { FormComponent } from './form.component';

fdescribe('FormComponent', () => {
  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;

  // Class Spies
  let repositoryServiceSpy = jasmine.createSpyObj('RepositoryService', ['savePins']);
  let navigationServiceSpy = jasmine.createSpyObj('NavigationService', ['goToPins']);
  let matSnackBarSpy = jasmine.createSpyObj('MatSnackBar', ['open']);

  beforeAll(() => {
    repositoryServiceSpy.savePins.and.returnValue(of(true));
    matSnackBarSpy.open.and.returnValue({
      afterDismissed: () => of(true)
    });
  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormComponent ],
      providers: [
        { provide: RepositoryService, useValue: repositoryServiceSpy },
        { provide: NavigationService, useValue: navigationServiceSpy },
        { provide: MatSnackBar, useValue: matSnackBarSpy },
      ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
      imports: [ReactiveFormsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('When component is initialized', () => {
    it('Should create the forms', () => {
      expect(Object.keys(component.firstFormGroup.controls)).toEqual(['title', 'author', 'description']);
      expect(Object.keys(component.secondFormGroup.controls)).toEqual(['firstAsset', 'assets']);
    });
  });

  describe('When addAsset is executed', () => {
    it('Should add new group', () => {
      const assets = component.secondFormGroup.get('assets') as FormArray;
      component.addAsset();
      component.addAsset();

      expect(Object.keys(assets.controls)).toEqual(['0', '1']);
    });
  });

  describe('When deleteAsset', () => {
    it('Should remove the form control', () => {
      const assets = component.secondFormGroup.get('assets') as FormArray;
      component.addAsset();
      component.deleteAsset(0);

      expect(Object.keys(assets.controls)).toEqual([]);
    });
  });

  describe('When savePins is executed', () => {
    it('Should navigate to pins view', () => {
      const goToPins = navigationServiceSpy.goToPins;
      const open = matSnackBarSpy.open;
      component.savePin();

      expect(goToPins).toHaveBeenCalled();
      expect(open).toHaveBeenCalledWith(
        'Your pin is saved, Redirecting ...',
        'Cool!',
        { duration: 2000 }
      );
    });
  });


});
