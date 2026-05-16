import { TestBed } from '@angular/core/testing';

import { PurityTypeMasterService } from './purity-type-master.service';

describe('PurityTypeMasterService', () => {
  let service: PurityTypeMasterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PurityTypeMasterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
