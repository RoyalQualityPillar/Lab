import { TestBed } from '@angular/core/testing';

import { InstrumentMasterService } from './instrument-master.service';

describe('InstrumentMasterService', () => {
  let service: InstrumentMasterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InstrumentMasterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
