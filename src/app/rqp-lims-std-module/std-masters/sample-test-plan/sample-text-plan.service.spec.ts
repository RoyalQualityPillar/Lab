import { TestBed } from '@angular/core/testing';

import { SampleTextPlanService } from './sample-text-plan.service';

describe('SampleTextPlanService', () => {
  let service: SampleTextPlanService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SampleTextPlanService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
