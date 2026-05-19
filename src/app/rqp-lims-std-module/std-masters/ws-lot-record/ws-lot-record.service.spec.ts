import { TestBed } from '@angular/core/testing';

import { WsLotRecordService } from './ws-lot-record.service';

describe('WsLotRecordService', () => {
  let service: WsLotRecordService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WsLotRecordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
