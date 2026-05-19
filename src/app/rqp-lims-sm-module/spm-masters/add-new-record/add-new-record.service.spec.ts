import { TestBed } from '@angular/core/testing';

import { AddNewRecordService } from './add-new-record.service';

describe('AddNewRecordService', () => {
  let service: AddNewRecordService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddNewRecordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
