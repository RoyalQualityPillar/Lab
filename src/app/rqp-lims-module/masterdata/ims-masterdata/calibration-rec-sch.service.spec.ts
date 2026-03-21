import { TestBed } from '@angular/core/testing';

import { CalibrationRecSchService } from './calibration-rec-sch.service';

describe('CalibrationRecSchService', () => {
  let service: CalibrationRecSchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalibrationRecSchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
