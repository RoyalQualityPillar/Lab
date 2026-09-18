import { TestBed } from '@angular/core/testing';

import { UtMasterService } from './ut-master.service';

describe('UtMasterService', () => {
  let service: UtMasterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UtMasterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
