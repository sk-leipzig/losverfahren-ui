import { TestBed, inject } from '@angular/core/testing';

import { SchuelerlistenService } from './schuelerlisten.service';

describe('SchuelerlistenService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SchuelerlistenService]
    });
  });

  it('should be created', inject([SchuelerlistenService], (service: SchuelerlistenService) => {
    expect(service).toBeTruthy();
  }));
});
