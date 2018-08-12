import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchuelerauswahlComponent } from './schuelerauswahl.component';

describe('SchuelerauswahlComponent', () => {
  let component: SchuelerauswahlComponent;
  let fixture: ComponentFixture<SchuelerauswahlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchuelerauswahlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchuelerauswahlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
