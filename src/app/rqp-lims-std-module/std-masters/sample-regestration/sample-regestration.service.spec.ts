import { TestBed } from '@angular/core/testing';

import { SampleRegestrationService } from './sample-regestration.service';

describe('SampleRegestrationService', () => {
  let service: SampleRegestrationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SampleRegestrationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
