import { TestBed } from '@angular/core/testing';

import { WsMasterService } from './ws-master.service';

describe('WsMasterService', () => {
  let service: WsMasterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WsMasterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
