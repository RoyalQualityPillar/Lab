import { TestBed } from '@angular/core/testing';

import { StabilityProtRecServiceService } from './stability-prot-rec-service.service';

describe('StabilityProtRecServiceService', () => {
  let service: StabilityProtRecServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StabilityProtRecServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
