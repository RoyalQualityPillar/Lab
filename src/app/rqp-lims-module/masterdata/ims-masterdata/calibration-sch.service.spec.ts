import { TestBed } from '@angular/core/testing';

import { CalibrationSchService } from './calibration-sch.service';

describe('CalibrationSchService', () => {
  let service: CalibrationSchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalibrationSchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
