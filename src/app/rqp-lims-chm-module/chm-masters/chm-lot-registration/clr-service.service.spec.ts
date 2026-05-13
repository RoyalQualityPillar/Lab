import { TestBed } from '@angular/core/testing';

import { ClrServiceService } from './clr-service.service';

describe('ClrServiceService', () => {
  let service: ClrServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClrServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
