import { TestBed } from '@angular/core/testing';

import { StabilityProtScheServiceService } from './stability-prot-sche-service.service';

describe('StabilityProtScheServiceService', () => {
  let service: StabilityProtScheServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StabilityProtScheServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
