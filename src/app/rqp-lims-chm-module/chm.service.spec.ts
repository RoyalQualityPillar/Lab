import { TestBed } from '@angular/core/testing';

import { ChmService } from './chm.service';

describe('ChmService', () => {
  let service: ChmService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChmService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
