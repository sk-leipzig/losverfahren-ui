import { TestBed, inject } from '@angular/core/testing';

import { LosverfahrenService } from './losverfahren.service';

describe('LosverfahrenService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LosverfahrenService]
    });
  });

  it('should be created', inject([LosverfahrenService], (service: LosverfahrenService) => {
    expect(service).toBeTruthy();
  }));
});
