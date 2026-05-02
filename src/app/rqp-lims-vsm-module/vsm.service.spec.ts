import { TestBed } from '@angular/core/testing';

import { VsmService } from './vsm.service';

describe('VsmService', () => {
  let service: VsmService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VsmService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
