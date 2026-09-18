import { TestBed } from '@angular/core/testing';

import { WsPeramentersMasterService } from './ws-peramenters-master.service';

describe('WsPeramentersMasterService', () => {
  let service: WsPeramentersMasterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WsPeramentersMasterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
