import { TestBed } from '@angular/core/testing';

import { TspicServiceService } from './tspic-service.service';

describe('TspicServiceService', () => {
  let service: TspicServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TspicServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
