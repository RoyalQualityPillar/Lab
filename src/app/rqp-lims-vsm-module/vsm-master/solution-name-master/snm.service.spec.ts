import { TestBed } from '@angular/core/testing';

import { SnmService } from './snm.service';

describe('SnmService', () => {
  let service: SnmService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SnmService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
