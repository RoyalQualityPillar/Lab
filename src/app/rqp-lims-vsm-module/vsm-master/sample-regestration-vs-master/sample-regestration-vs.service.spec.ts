import { TestBed } from '@angular/core/testing';

import { SampleRegestrationVsService } from './sample-regestration-vs.service';

describe('SampleRegestrationVsService', () => {
  let service: SampleRegestrationVsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SampleRegestrationVsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
