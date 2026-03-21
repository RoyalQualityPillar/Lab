import { TestBed } from '@angular/core/testing';

import { CalibrationFreqService } from './calibration-freq.service';

describe('CalibrationFreqService', () => {
  let service: CalibrationFreqService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalibrationFreqService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
