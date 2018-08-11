import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LosverfahrenListeComponent } from './losverfahren-liste.component';

describe('LosverfahrenListeComponent', () => {
  let component: LosverfahrenListeComponent;
  let fixture: ComponentFixture<LosverfahrenListeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LosverfahrenListeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LosverfahrenListeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
