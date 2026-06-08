import { TestBed } from '@angular/core/testing';

import { FieldMasterService } from './field-master.service';

describe('FieldMasterService', () => {
  let service: FieldMasterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FieldMasterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
