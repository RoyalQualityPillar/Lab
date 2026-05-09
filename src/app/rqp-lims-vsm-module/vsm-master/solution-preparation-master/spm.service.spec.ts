import { TestBed } from '@angular/core/testing';

import { SpmService } from './spm.service';

describe('SpmService', () => {
  let service: SpmService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpmService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
