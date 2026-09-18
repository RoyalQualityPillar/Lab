import { TestBed } from '@angular/core/testing';

import { ChambersShellMasterServiceService } from './chambers-shell-master-service.service';

describe('ChambersShellMasterServiceService', () => {
  let service: ChambersShellMasterServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChambersShellMasterServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
