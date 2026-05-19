import { TestBed } from '@angular/core/testing';

import { TspicmServiceService } from './tspicm-service.service';

describe('TspicmServiceService', () => {
  let service: TspicmServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TspicmServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
