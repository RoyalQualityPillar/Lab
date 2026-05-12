import { TestBed } from '@angular/core/testing';

import { WsLotPuritiesRecordService } from './ws-lot-purities-record.service';

describe('WsLotPuritiesRecordService', () => {
  let service: WsLotPuritiesRecordService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WsLotPuritiesRecordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
