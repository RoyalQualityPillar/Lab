import { TestBed } from '@angular/core/testing';

import { ChambersRacksMasterServiceService } from './chambers-racks-master-service.service';

describe('ChambersRacksMasterServiceService', () => {
  let service: ChambersRacksMasterServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChambersRacksMasterServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
