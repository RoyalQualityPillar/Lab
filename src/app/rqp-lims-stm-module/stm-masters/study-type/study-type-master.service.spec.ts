import { TestBed } from '@angular/core/testing';

import { StudyTypeMasterService } from './study-type-master.service';

describe('StudyTypeMasterService', () => {
  let service: StudyTypeMasterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StudyTypeMasterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
