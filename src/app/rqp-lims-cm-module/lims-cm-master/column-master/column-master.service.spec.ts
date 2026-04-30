import { TestBed } from '@angular/core/testing';

import { ColumnMasterService } from './column-master.service';

describe('ColumnMasterService', () => {
  let service: ColumnMasterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ColumnMasterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
