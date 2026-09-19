import { TestBed } from '@angular/core/testing';

import { StabilityProtScheRecServiceService } from './stability-prot-sche-rec-service.service';

describe('StabilityProtScheRecServiceService', () => {
  let service: StabilityProtScheRecServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StabilityProtScheRecServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
