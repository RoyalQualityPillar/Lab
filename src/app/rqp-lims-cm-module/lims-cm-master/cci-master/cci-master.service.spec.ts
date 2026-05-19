import { TestBed } from '@angular/core/testing';

import { CciMasterService } from './cci-master.service';

describe('CciMasterService', () => {
  let service: CciMasterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CciMasterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
