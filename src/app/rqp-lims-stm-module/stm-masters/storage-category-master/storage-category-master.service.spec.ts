import { TestBed } from '@angular/core/testing';

import { StorageCategoryMasterService } from './storage-category-master.service';

describe('StorageCategoryMasterService', () => {
  let service: StorageCategoryMasterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StorageCategoryMasterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
