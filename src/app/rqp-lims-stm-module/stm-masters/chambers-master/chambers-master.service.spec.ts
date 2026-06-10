import { TestBed } from '@angular/core/testing';

import { ChambersMasterService } from './chambers-master.service';

describe('ChambersMasterService', () => {
  let service: ChambersMasterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChambersMasterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
