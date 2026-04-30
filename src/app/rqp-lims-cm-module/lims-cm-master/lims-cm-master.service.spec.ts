import { TestBed } from '@angular/core/testing';

import { LimsCmMasterService } from './lims-cm-master.service';

describe('LimsCmMasterService', () => {
  let service: LimsCmMasterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LimsCmMasterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
