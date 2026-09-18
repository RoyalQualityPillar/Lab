import { TestBed } from '@angular/core/testing';

import { WsPeraamentersRecordService } from './ws-peraamenters-record.service';

describe('WsPeraamentersRecordService', () => {
  let service: WsPeraamentersRecordService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WsPeraamentersRecordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
