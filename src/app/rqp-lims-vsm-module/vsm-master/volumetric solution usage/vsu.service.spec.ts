import { TestBed } from '@angular/core/testing';

import { VsuService } from './vsu.service';

describe('VsuService', () => {
  let service: VsuService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VsuService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
