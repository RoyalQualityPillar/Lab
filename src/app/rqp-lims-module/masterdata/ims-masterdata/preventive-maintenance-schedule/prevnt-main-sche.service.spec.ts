import { TestBed } from '@angular/core/testing';

import { PrevntMainScheService } from './prevnt-main-sche.service';

describe('PrevntMainScheService', () => {
  let service: PrevntMainScheService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrevntMainScheService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
