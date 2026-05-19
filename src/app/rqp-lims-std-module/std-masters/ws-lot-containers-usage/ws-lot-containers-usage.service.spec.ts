import { TestBed } from '@angular/core/testing';

import { WsLotContainersUsageService } from './ws-lot-containers-usage.service';

describe('WsLotContainersUsageService', () => {
  let service: WsLotContainersUsageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WsLotContainersUsageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
