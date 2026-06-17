import { TestBed } from '@angular/core/testing';

import { IpmService } from './ipm.service';

describe('IpmService', () => {
  let service: IpmService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IpmService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
