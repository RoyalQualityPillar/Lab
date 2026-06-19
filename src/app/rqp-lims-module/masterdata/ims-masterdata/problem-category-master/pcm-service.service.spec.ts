import { TestBed } from '@angular/core/testing';

import { PcmServiceService } from './pcm-service.service';

describe('PcmServiceService', () => {
  let service: PcmServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PcmServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
