import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeilnehmernummerComponent } from './teilnehmernummer.component';

describe('TeilnehmernummerComponent', () => {
  let component: TeilnehmernummerComponent;
  let fixture: ComponentFixture<TeilnehmernummerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeilnehmernummerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeilnehmernummerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
