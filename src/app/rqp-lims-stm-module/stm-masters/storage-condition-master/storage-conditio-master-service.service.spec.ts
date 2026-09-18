import { TestBed } from '@angular/core/testing';

import { StorageConditioMasterServiceService } from './storage-conditio-master-service.service';

describe('StorageConditioMasterServiceService', () => {
  let service: StorageConditioMasterServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StorageConditioMasterServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
