import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LosverfahrenDetailComponent } from './losverfahren-detail.component';

describe('LosverfahrenDetailComponent', () => {
  let component: LosverfahrenDetailComponent;
  let fixture: ComponentFixture<LosverfahrenDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LosverfahrenDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LosverfahrenDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
