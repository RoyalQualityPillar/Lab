import { TestBed } from '@angular/core/testing';

import { RsmService } from './rsm.service';

describe('RsmService', () => {
  let service: RsmService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RsmService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
