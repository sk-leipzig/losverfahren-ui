import { TestBed, inject } from '@angular/core/testing';

import { KurslistenService } from './kurslisten.service';

describe('KurslistenService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [KurslistenService]
    });
  });

  it('should be created', inject([KurslistenService], (service: KurslistenService) => {
    expect(service).toBeTruthy();
  }));
});
