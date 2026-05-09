import { TestBed } from '@angular/core/testing';

import { SampleTestPlanService } from './sample-test-plan.service';

describe('SampleTestPlanService', () => {
  let service: SampleTestPlanService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SampleTestPlanService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
