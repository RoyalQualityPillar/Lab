import { TestBed } from '@angular/core/testing';

import { GtpService } from './gtp.service';

describe('GtpService', () => {
  let service: GtpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GtpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
