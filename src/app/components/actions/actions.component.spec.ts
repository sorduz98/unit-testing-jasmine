import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatBottomSheetRef } from '@angular/material';

import { PinsService } from '../pins/pins.service';
import { ActionsComponent } from './actions.component';

fdescribe('ActionsComponent', () => {
  let component: ActionsComponent;
  let fixture: ComponentFixture<ActionsComponent>;

  let matBottomSheetRefSpy = jasmine.createSpyObj('MatBottomSheetRef', ['dismiss']);
  let pinsServiceSpy = jasmine.createSpyObj('PinsService', ['resolveActionObserver']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActionsComponent ],
      providers: [
        { provide: MatBottomSheetRef, useValue: matBottomSheetRefSpy },
        { provide: PinsService, useValue: pinsServiceSpy },
      ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('When openLink is executed', () => {
    it('Should call preventDefault', () => {
      const mouseEventSpy = jasmine.createSpyObj('MouseEvent', ['preventDefault']);
      const action = 'Working';
      component.openLink(mouseEventSpy, action);
      expect(mouseEventSpy.preventDefault).toHaveBeenCalled();
    });

    it('Should call dismiss', () => {
      const mouseEventSpy = jasmine.createSpyObj('MouseEvent', ['preventDefault']);
      const action = 'Working';
      component.openLink(mouseEventSpy, action);
      expect(matBottomSheetRefSpy.dismiss).toHaveBeenCalled();
    });

    it('Should call resolveActionObserver', () => {
      const mouseEventSpy = jasmine.createSpyObj('MouseEvent', ['preventDefault']);
      const action = 'Working';
      component.openLink(mouseEventSpy, action);
      expect(pinsServiceSpy.resolveActionObserver).toHaveBeenCalledWith(action);
    });
  });
});
