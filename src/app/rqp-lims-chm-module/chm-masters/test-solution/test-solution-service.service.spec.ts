import { TestBed } from '@angular/core/testing';

import { TestSolutionServiceService } from './test-solution-service.service';

describe('TestSolutionServiceService', () => {
  let service: TestSolutionServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TestSolutionServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
