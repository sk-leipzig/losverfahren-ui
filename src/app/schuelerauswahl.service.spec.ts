import { TestBed, inject } from '@angular/core/testing';

import { SchuelerauswahlService } from './schuelerauswahl.service';

describe('SchuelerauswahlService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SchuelerauswahlService]
    });
  });

  it('should be created', inject([SchuelerauswahlService], (service: SchuelerauswahlService) => {
    expect(service).toBeTruthy();
  }));
});
