import { TestBed } from '@angular/core/testing';

import { WslrService } from './wslr.service';

describe('WslrService', () => {
  let service: WslrService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WslrService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
