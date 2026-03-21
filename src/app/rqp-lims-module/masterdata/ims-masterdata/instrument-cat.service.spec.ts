import { TestBed } from '@angular/core/testing';

import { InstrumentCatService } from './instrument-cat.service';

describe('InstrumentCatService', () => {
  let service: InstrumentCatService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InstrumentCatService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
