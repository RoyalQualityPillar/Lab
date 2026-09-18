import { TestBed } from '@angular/core/testing';

import { ChambersTypeMasterServiceService } from './chambers-type-master-service.service';

describe('ChambersTypeMasterServiceService', () => {
  let service: ChambersTypeMasterServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChambersTypeMasterServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
