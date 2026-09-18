import { TestBed } from '@angular/core/testing';

import { StudyTypeMasterServiceService } from './study-type-master-service.service';

describe('StudyTypeMasterServiceService', () => {
  let service: StudyTypeMasterServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StudyTypeMasterServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
