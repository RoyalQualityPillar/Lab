import { TestBed } from '@angular/core/testing';

import { CluServiceService } from './clu-service.service';

describe('CluServiceService', () => {
  let service: CluServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CluServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
