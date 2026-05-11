import { TestBed } from '@angular/core/testing';

import { WsLotContainersRecordService } from './ws-lot-containers-record.service';

describe('WsLotContainersRecordService', () => {
  let service: WsLotContainersRecordService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WsLotContainersRecordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
