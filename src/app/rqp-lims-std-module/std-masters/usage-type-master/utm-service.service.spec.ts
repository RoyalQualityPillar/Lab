import { TestBed } from '@angular/core/testing';

import { UtmServiceService } from './utm-service.service';

describe('UtmServiceService', () => {
  let service: UtmServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UtmServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
