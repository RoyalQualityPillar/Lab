import { TestBed } from '@angular/core/testing';

import { LimsCmService } from './lims-cm.service';

describe('LimsCmService', () => {
  let service: LimsCmService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LimsCmService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
