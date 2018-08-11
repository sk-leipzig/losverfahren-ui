import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KurslisteComponent } from './kursliste.component';

describe('KurslisteComponent', () => {
  let component: KurslisteComponent;
  let fixture: ComponentFixture<KurslisteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KurslisteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KurslisteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
