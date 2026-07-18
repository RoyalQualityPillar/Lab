import { TestBed } from '@angular/core/testing';

import { AqNominationService } from './aq-nomination.service';

describe('AqNominationService', () => {
  let service: AqNominationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AqNominationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
