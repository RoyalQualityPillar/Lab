import { TestBed } from '@angular/core/testing';

import { CumService } from './cum.service';

describe('CumService', () => {
  let service: CumService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CumService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
