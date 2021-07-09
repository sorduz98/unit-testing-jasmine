import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { MenuComponent } from './menu.component';

fdescribe('MenuComponent', () => {
  let component: MenuComponent;
  let fixture: ComponentFixture<MenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    const title = fixture.debugElement.query(By.css('h1'));
    expect(title.nativeElement.innerHTML).toBe('eLearning Management System');
    expect(component).toBeTruthy();
  });

  it('Testing output', () => {
    const value = true;
    component.clicked.subscribe((res) => {
      expect(res).toBe(value);
    });

    component.clicked.emit(value);
  });

  it('Testing click', () => {
    const button = fixture.debugElement.query(By.css('button'));
    expect(component.counter).toBe(0);
    button.triggerEventHandler('click', null);
    expect(component.counter).toBe(1);
  })
});
