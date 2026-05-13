import { TestBed } from '@angular/core/testing';

import { TsmServiceService } from './tsm-service.service';

describe('TsmServiceService', () => {
  let service: TsmServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TsmServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
