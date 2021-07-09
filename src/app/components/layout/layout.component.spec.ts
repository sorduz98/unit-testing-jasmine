import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatBottomSheet } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';
import { ActionsComponent } from '../actions/actions.component';

import { LayoutComponent } from './layout.component';

fdescribe('LayoutComponent', () => {
  let component: LayoutComponent;
  let fixture: ComponentFixture<LayoutComponent>;

  // Class Spies
  let matBottomSheetSpy = jasmine.createSpyObj('MatBottomSheet', ['open']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LayoutComponent ],
      providers: [
        { provide: MatBottomSheet, useValue: matBottomSheetSpy },
      ],
      imports: [
        RouterTestingModule.withRoutes([
          {
            path: '',
            component: LayoutComponent
          },
          {
            path: 'app/add',
            component: LayoutComponent
          }
        ])
      ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should set the editMode to false', () => {
    const verifyEditMode = spyOn(component, 'verifyEditMode').and.callThrough();
    fixture.ngZone.run(() => {
      component['router'].navigate(['/']);
      fixture.whenStable()
      .then(() => {
        expect(verifyEditMode).toHaveBeenCalled();
        expect(component.editMode).toBeFalsy();
      });
    });
  });

  it('Should set the editMode to true', () => {
    const verifyEditMode = spyOn(component, 'verifyEditMode').and.callThrough();
    fixture.ngZone.run(() => {
      component['router'].navigate(['app/add']);
      fixture.whenStable()
      .then(() => {
        expect(verifyEditMode).toHaveBeenCalled();
        expect(component.editMode).toBeTruthy();
      });
    });
  });

  it('Should called open', () => {
    component.openBottomSheet();
    expect(matBottomSheetSpy.open).toHaveBeenCalledWith(ActionsComponent);
  });
});
