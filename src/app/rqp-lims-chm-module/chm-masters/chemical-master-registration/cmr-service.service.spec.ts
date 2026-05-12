import { TestBed } from '@angular/core/testing';

import { CmrServiceService } from './cmr-service.service';

describe('CmrServiceService', () => {
  let service: CmrServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CmrServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
