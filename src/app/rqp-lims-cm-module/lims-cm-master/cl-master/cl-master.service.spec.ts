import { TestBed } from '@angular/core/testing';

import { ClMasterService } from './cl-master.service';

describe('ClMasterService', () => {
  let service: ClMasterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClMasterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
